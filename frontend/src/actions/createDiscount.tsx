import axios from 'axios'

const createDiscount =
  (coupon: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: 'CREATE_DISCOUNT_REQUEST',
      })
      const { userInfo } = getState((state: any) => state.userInfo)
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }
      const { data } = await axios.post(`/api/coupons`, coupon, config)
      dispatch({
        type: 'CREATE_DISCOUNT_SUCCESS',
        payload: data.code,
      })
    } catch (error: any) {
      dispatch({
        type: 'CREATE_DISCOUNT_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export default createDiscount
