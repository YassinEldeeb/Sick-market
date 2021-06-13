import axios from 'axios'

const getDashboardDiscounts =
  (skip?: any) => async (dispatch: any, getState: any) => {
    try {
      if (skip) {
        dispatch({
          type: 'INFINITE_DISCOUNTS_REQUEST',
        })
      } else {
        dispatch({
          type: 'GET_DISCOUNTS_REQUEST',
        })
      }

      const { userInfo } = getState((state: any) => state.userInfo)
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }
      const { data } = await axios.get(
        `/api/coupons?limit=10&skip=${skip ? skip * 10 : 0}`,
        config
      )
      if (skip) {
        dispatch({
          type: 'INFINITE_DISCOUNTS_SUCCESS',
          payload: data.coupons,
        })
      } else {
        dispatch({
          type: 'GET_DISCOUNTS_SUCCESS',
          payload: { discounts: data.coupons, count: data.count },
        })
      }
    } catch (error: any) {
      if (skip) {
        dispatch({
          type: 'INFINITE_DISCOUNTS_FAIL',
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      } else {
        dispatch({
          type: 'GET_DISCOUNTS_FAIL',
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }
  }
export default getDashboardDiscounts
