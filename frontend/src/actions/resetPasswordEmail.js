import axios from "axios"

const resetPasswordEmail = (email) => async (dispatch) => {
  console.log(email)
  try {
    dispatch({ type: "RESET_PASSWORD_REQUEST" })

    await axios.post("/api/users/resetPasswordEmail", {
      email,
    })

    dispatch({ type: "RESET_PASSWORD_SUCCESS" })
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default resetPasswordEmail
