import axios from "axios"

const userLoginAction = (
  email,
  password,
  loginMethod,
  profilePicLink
) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" })
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    }
    const { data } = await axios.post(
      "/api/users/login",
      { email, password, loginMethod, profilePicLink },
      config
    )
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data })
    localStorage.setItem("sickUserInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    localStorage.setItem("sickUserInfo", JSON.stringify({}))
  }
}
export default userLoginAction
