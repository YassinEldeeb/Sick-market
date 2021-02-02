import axios from "axios"

const userUpdateAction = (name, email, password) => async (
  dispatch,
  getState
) => {
  console.log("Update Password", password)
  const userInfo = getState().userInfo
  try {
    dispatch({ type: "UPDATE_USER_REQUEST" })
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const passedObj = {}
    const passedObjFN = () => {
      if (name) {
        passedObj.name = name
      }
      if (email) {
        passedObj.email = email
      }
      if (password) {
        passedObj.password = password
      }
      return passedObj
    }
    const { data } = await axios.patch(
      "/api/users/profile",
      passedObjFN(),
      config
    )
    dispatch({ type: "UPDATE_USER_SUCCESS", payload: data })
    localStorage.setItem(
      "sickUserInfo",
      JSON.stringify({ user: data, token: userInfo.token })
    )
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default userUpdateAction
