import axios from 'axios'

const getDashboardDiscounts = (sortValue) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_DISCOUNTS_REQUEST',
    })
    const { userInfo } = getState((state) => state.userInfo)
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    const { data } = await axios.get(`/api/coupons?limit=10`, config)
    dispatch({
      type: 'GET_DISCOUNTS_SUCCESS',
      payload: { discounts: data.coupons, count: data.count },
    })
  } catch (error) {
    dispatch({
      type: 'GET_DISCOUNTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default getDashboardDiscounts
