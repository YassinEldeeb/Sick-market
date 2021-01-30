import axios from "axios"
import userLoginAction from "../actions/login"

const userRegisterAction = (
  name,
  email,
  password,
  profilePicLink,
  loginMethod
) => async (dispatch) => {
  try {
    if (!loginMethod) {
      try {
        dispatch({ type: "REGISTER_REQUEST" })
        const config = {
          headers: {
            Content_Type: "application/json",
          },
        }
        let passedObj
        if (profilePicLink) {
          passedObj = {
            name,
            email,
            password,
            profilePicLink,
            status: "Verified",
          }
        } else {
          passedObj = { name, email, password }
        }

        const { data } = await axios.post("/api/users", passedObj, config)
        dispatch({ type: "REGISTER_SUCCESS" })

        dispatch({ type: "USER_LOGIN_SUCCESS", payload: data })
        localStorage.setItem("sickUserInfo", JSON.stringify(data))
      } catch (err) {
        console.log(email, password)
        dispatch(userLoginAction(email, password, loginMethod, profilePicLink))
      }
    } else {
      dispatch({ type: "REGISTER_REQUEST" })
      const config = {
        headers: {
          Content_Type: "application/json",
        },
      }
      let passedObj
      if (profilePicLink) {
        passedObj = { name, email, password, profilePicLink }
      } else {
        passedObj = { name, email, password }
      }
      const { data } = await axios.post("/api/users", passedObj, config)
      dispatch({ type: "REGISTER_SUCCESS" })
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data })
      localStorage.setItem("sickUserInfo", JSON.stringify(data))
    }
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
