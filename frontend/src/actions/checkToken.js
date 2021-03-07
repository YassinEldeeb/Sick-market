import axios from "axios"

const checkToken = (token) => async (dispatch) => {
  try {
    dispatch({ type: "CHECK_TOKEN_REQUEST" })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
    await axios.post("/api/users/checkToken", null, config)
    dispatch({ type: "CHECK_TOKEN_SUCCESS", payload: true })
  } catch (error) {
    if (error.response.status === 401) {
      console.log(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
      dispatch({ type: "USER_LOGOUT" })
      localStorage.removeItem("sickUserInfo")
      dispatch({ type: "CHECK_TOKEN_SUCCESS", payload: false })
    } else {
      dispatch({
        type: "CHECK_TOKEN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export default checkToken
