import axios from 'axios'

const orderActions = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: 'ORDER_ACTIONS_REQUEST',
    })

    const { userInfo } = getState((state: any) => state.userInfo)
    const { orders } = getState().dashboardOrders

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    let targetUser

    if (orders) {
      targetUser = orders.find(
        (each: any) => each._id.toString() === id.toString()
      )
    }
    let payloadData
    if (!targetUser) {
      const { data } = await axios.get(`/api/orders/admin/${id}`, config)
      payloadData = data
    } else {
      payloadData = targetUser
    }

    dispatch({
      type: 'ORDER_ACTIONS_SUCCESS',
      payload: payloadData,
    })
  } catch (error: any) {
    dispatch({
      type: 'ORDER_ACTIONS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default orderActions
