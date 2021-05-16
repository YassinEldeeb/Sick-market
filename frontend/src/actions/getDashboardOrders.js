import axios from 'axios'

const getDashboardOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_DASHBOARD_ORDERS_REQUEST',
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

    const { data } = await axios.get(`/api/orders/allOrders?limit=10`, config)
    dispatch({
      type: 'GET_DASHBOARD_ORDERS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'GET_DASHBOARD_ORDERS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default getDashboardOrdersAction
