import axios from 'axios'

const getMyOrdersAction = () => async (dispatch: any, getState: any) => {
  const { userInfo } = getState((state: any) => state.userInfo)

  try {
    dispatch({ type: 'GET_MY_ORDERS_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    const { data } = await axios.get(`/api/orders/myOrders?limit=15`, config)
    dispatch({ type: 'GET_MY_ORDERS_SUCCESS', payload: data })
  } catch (error: any) {
    dispatch({
      type: 'GET_MY_ORDERS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getMyOrdersAction
