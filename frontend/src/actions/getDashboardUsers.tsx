import axios from 'axios'

const getDashboardUsersAction =
  (filterValue: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: 'GET_DASHBOARD_USERS_REQUEST',
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
      const { data } = await axios.get(
        `/api/users?limit=10&sort=${
          filterValue === 'top paid' ? 'topPaid' : filterValue
        }`,
        config
      )

      dispatch({
        type: 'GET_DASHBOARD_USERS_SUCCESS',
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: 'GET_DASHBOARD_USERS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export default getDashboardUsersAction
