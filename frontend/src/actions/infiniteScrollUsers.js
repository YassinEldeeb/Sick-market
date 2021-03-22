import axios from "axios"

const infiniteScrollUsersAction = (skip) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "INFINITE_USERS_REQUEST",
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
    const { data } = await axios.get(
      `/api/users?limit=10&skip=${10 * skip}`,
      config
    )

    if (!data.users.length || data.users.length < 10) {
      dispatch({
        type: "INFINITE_USERS_END",
      })
    }
    dispatch({
      type: "INFINITE_USERS_SUCCESS",
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: "INFINITE_USERS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default infiniteScrollUsersAction
