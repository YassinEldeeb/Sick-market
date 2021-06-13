import axios from 'axios'

const getOrderAction = (id: any) => async (dispatch: any, getState: any) => {
  const { userInfo } = getState((state: any) => state.userInfo)
  try {
    dispatch({ type: 'GET_ORDER_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispatch({ type: 'GET_ORDER_SUCCESS', payload: data })
  } catch (error: any) {
    dispatch({
      type: 'GET_ORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default getOrderAction
