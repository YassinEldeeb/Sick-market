import axios from 'axios'

const deleteDiscount =
  (code = 'deleteAll', all) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: 'DELETE_DISCOUNT_REQUEST',
        payload: code,
      })

      const state = getState((state) => state)
      const userInfo = getState((state) => state).userInfo
      const discounts = getState((state) => state).discounts
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }

      if (!all) await axios.delete(`/api/coupons/${code}`, config)
      if (all) await axios.delete(`/api/coupons/${code}?deleteAll=true`, config)

      if (!all) {
        discounts.discounts = discounts.discounts.filter(
          (each) => each.code.toString() !== code.toString()
        )
        discounts.count -= 1
      } else {
        discounts.discounts = []
        discounts.count = 0
      }
      state.discounts = { ...discounts }

      dispatch({
        type: 'DELETE_DISCOUNT_SUCCESS',
      })
    } catch (error) {
      dispatch({
        type: 'DELETE_DISCOUNT_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export default deleteDiscount
