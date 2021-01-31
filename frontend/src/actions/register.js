import axios from "axios"

const userRegisterAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" })
    const config = {
      headers: {
        Content_Type: "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    )
    dispatch({ type: "REGISTER_SUCCESS" })
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data })
    localStorage.setItem("sickUserInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    localStorage.setItem("sickUserInfo", JSON.stringify({}))
  }
}
export default userRegisterAction
