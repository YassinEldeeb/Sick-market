import axios from 'axios'

export const packOrderAction =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: 'PACK_ORDER_REQUEST' })

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

      const { data } = await axios.patch(`/api/orders/${id}/pack`, null, config)

      const newOrder = { ...order, packed: data.packed }
      dashboardOrders.orders = dashboardOrders.orders.map((each: any) => {
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
    } catch (error: any) {
      dispatch({
        type: 'PACK_ORDER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
