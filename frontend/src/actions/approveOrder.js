import axios from 'axios'

export const approveOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'APPROVE_ORDER_REQUEST' })

    const { userInfo } = getState((state) => state.userInfo)
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
    dashboardOrders.orders = dashboardOrders.orders.map((each) => {
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
  } catch (error) {
    dispatch({
      type: 'APPROVE_ORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
