import axios from 'axios'

const orderDeliverAction = (id) => async (dispatch, getState) => {
  const { userInfo } = getState((state) => state.userInfo)

  try {
    dispatch({ type: 'ORDER_DELIVER_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    const { data } = await axios.patch(
      `/api/orders/${id}/deliver`,
      null,
      config
    )
    dispatch({ type: 'ORDER_DELIVER_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_DELIVER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default orderDeliverAction
