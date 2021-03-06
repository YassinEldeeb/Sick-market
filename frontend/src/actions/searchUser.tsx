import axios from 'axios'

const searchDashboardUsersAction =
  (search: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: 'SEARCH_DASHBOARD_USERS_REQUEST',
      })
      const { userInfo } = getState((state: any) => state.userInfo)
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }
      const { data } = await axios.post(
        '/api/users/search?limit=10',
        { search },
        config
      )
      dispatch({
        type: 'SEARCH_DASHBOARD_USERS_SUCCESS',
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: 'SEARCH_DASHBOARD_USERS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export default searchDashboardUsersAction
