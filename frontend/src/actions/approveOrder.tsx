import axios from 'axios'

export const approveOrderAction =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: 'APPROVE_ORDER_REQUEST' })

      const { userInfo } = getState((state: any) => state.userInfo)
      const { order } = getState().orderActions
      const dashboardOrders = getState().dashboardOrders

      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }

      const { data } = await axios.patch(
        `/api/orders/${id}/approve`,
        null,
        config
      )

      const newOrder = { ...order, approved: data.approved }
      dashboardOrders.orders = dashboardOrders.orders.map((each: any) => {
        if (each._id === order._id) {
          return newOrder
        } else {
          return each
        }
      })
      dispatch({
        type: 'APPROVE_ORDER_SUCCESS',
        payload: newOrder,
      })
    } catch (error: any) {
      dispatch({
        type: 'APPROVE_ORDER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
