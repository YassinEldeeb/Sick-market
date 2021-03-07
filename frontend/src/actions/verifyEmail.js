import axios from "axios"

export const verifyEmailAction = (enteredCode) => async (
  dispatch,
  getState
) => {
  dispatch({ type: "VERIFY_REQUEST" })
  const userInfo = getState().userInfo
  if (userInfo.token && userInfo.user.status === "pending") {
    try {
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()

      const config = {
        headers: {
          Content_Type: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }
      await axios.post(
        "/api/users/getSecurityCode",
        { code: Number(enteredCode) },
        config
      )
      dispatch({ type: "VERIFY_SUCCESS" })

      localStorage.setItem(
        "sickUserInfo",
        JSON.stringify({
          user: getState().userInfo.user,
          token: getState().userInfo.token,
        })
      )
    } catch (error) {
      dispatch({
        type: "VERIFY_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
export default verifyEmailAction
