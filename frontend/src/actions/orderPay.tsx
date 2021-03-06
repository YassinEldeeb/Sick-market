import axios from 'axios'

const orderPayAction =
  (id: any, paymentResult: any) => async (dispatch: any, getState: any) => {
    const { userInfo } = getState((state: any) => state.userInfo)

    try {
      dispatch({ type: 'ORDER_PAY_REQUEST' })
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
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      )
      dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data })
    } catch (error: any) {
      dispatch({
        type: 'ORDER_PAY_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export default orderPayAction
