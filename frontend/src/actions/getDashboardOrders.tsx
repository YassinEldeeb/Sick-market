import axios from 'axios'

const getDashboardOrdersAction =
  (
    sortType?: any,
    sortValue?: any,
    governorate?: any,
    user?: any,
    filter?: any
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      const { userInfo } = getState((state: any) => state.userInfo)
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }

      let BaseUrl = '/api/orders/allOrders?limit=10&'
      let BasicURL = '/api/orders/allOrders?limit=10&createdAt=newest'
      let sorting = false

      const filterValues = filter
        ? filter.map((e: any) => {
            return e.value
          })
        : null

      if (filterValues) {
        filterValues.forEach((e: any) => {
          BaseUrl += `${e.replace('Not ', '').toLowerCase()}=${
            e.includes('Not ') ? false : true
          }&`
        })
      }

      if (sortType && sortValue) {
        BaseUrl += `${sortType}=${sortValue.toLowerCase()}&`
      }

      if (user) {
        BaseUrl += `email=${user}&`
      }
      if (governorate) {
        BaseUrl += `governorate=${governorate}&`
      }

      dispatch({
        type: 'GET_DASHBOARD_ORDERS_REQUEST',
      })
      if (user || governorate || (sortType && sortValue) || filterValues) {
        sorting = true
        dispatch({
          type: 'SORTING_ORDERS_REQUEST',
        })
      }
      const { data } = await axios.get(sorting ? BaseUrl : BasicURL, config)

      dispatch({
        type: 'GET_DASHBOARD_ORDERS_SUCCESS',
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: 'GET_DASHBOARD_ORDERS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export default getDashboardOrdersAction
