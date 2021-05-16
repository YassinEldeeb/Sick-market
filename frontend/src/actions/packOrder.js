import axios from 'axios'

export const packOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PACK_ORDER_REQUEST' })

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

    const { data } = await axios.patch(`/api/orders/${id}/pack`, null, config)

    const newOrder = { ...order, packed: data.packed }
    dashboardOrders.orders = dashboardOrders.orders.map((each) => {
      if (each._id === order._id) {
        return newOrder
      } else {
        return each
      }
    })
    dispatch({
      type: 'PACK_ORDER_SUCCESS',
      payload: newOrder,
    })
  } catch (error) {
    dispatch({
      type: 'PACK_ORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
