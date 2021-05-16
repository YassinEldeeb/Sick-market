import axios from 'axios'

export const rejectOrderAction = (id, reason) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'REJECT_ORDER_REQUEST' })
    dispatch({ type: 'REJECT_ORDER_CONFIRM_RESET' })

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
      `/api/orders/${id}/reject`,
      { reason },
      config
    )
    const newOrder = { ...order, rejected: data.rejected, approved: undefined }
    dashboardOrders.orders = dashboardOrders.orders.map((each) => {
      if (each._id === order._id) {
        return newOrder
      } else {
        return each
      }
    })
    dispatch({
      type: 'REJECT_ORDER_SUCCESS',
      payload: newOrder,
    })
  } catch (error) {
    dispatch({
      type: 'REJECT_ORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
