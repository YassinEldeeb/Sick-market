import axios from "axios"

const getDashboardUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_DASHBOARD_USERS_REQUEST",
    })
    const { userInfo } = getState((state) => state.userInfo)
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    const { data } = await axios.get("/api/users", config)
    dispatch({
      type: "GET_DASHBOARD_USERS_SUCCESS",
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: "GET_DASHBOARD_USERS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default getDashboardUsersAction
