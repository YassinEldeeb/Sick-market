import axios from 'axios'

export const productListAction =
  (type?: any, value?: any, brand?: any, category?: any) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: 'PRODUCT_LIST_REQUEST' })
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()

      let BaseUrl = '/api/products?limit=10&'
      let BasicURL = '/api/products?createdAt=newest&limit=10'

      if (type) {
        const valueFN = () => {
          switch (value) {
            case 'top rated':
              return 'highest'
            case 'underrated':
              return 'lowest'

            default:
              return value
          }
        }
        BaseUrl += `${type}=${valueFN()}&`
      }
      if (brand) {
        BaseUrl += `brand=${brand}&`
      }
      if (category) {
        BaseUrl += `category=${category}&`
      }
      let sorting = false
      if (type || brand || category) {
        sorting = true
        dispatch({
          type: 'SORTING_PRODUCTS_REQUEST',
        })
      }
      const { data } = await axios.get(sorting ? BaseUrl : BasicURL, {
        cancelToken: source.token,
      })
      dispatch({
        type: 'PRODUCT_LIST_SUCCESS',
        payload: data,
      })
      if (type || brand || category) {
        dispatch({
          type: 'SORTING_PRODUCTS_SUCCESS',
        })
      }
    } catch (error: any) {
      dispatch({
        type: 'PRODUCT_LIST_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const productDetailAction = (id: any) => async (dispatch: any) => {
  try {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })
    const { data } = await axios.get(`/api/products/${id}`, {
      cancelToken: source.token,
    })
    dispatch({ type: 'PRODUCT_DETAIL_SUCCESS', payload: data })
  } catch (error: any) {
    dispatch({
      type: 'PRODUCT_DETAIL_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const DashboardProductDetailAction =
  (id: any, search: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: 'DASHBOARD_PRODUCT_DETAIL_REQUEST' })

      const state = getState((state: any) => state.productList)
      const productList = state.productList
      const searchedProducts = state.productSearch

      const cancelToken = axios.CancelToken
      const source = cancelToken.source()

      let targetProduct
      const condition = () => {
        if (productList.products) {
          return true
        } else if (searchedProducts.products) {
          return true
        } else {
          return false
        }
      }
      if (condition()) {
        if (!search) {
          targetProduct = productList.products.find(
            (each: any) => each._id.toString() === id.toString()
          )
        }
        if (search) {
          targetProduct = searchedProducts.products.find(
            (each: any) => each._id.toString() === id.toString()
          )
        }
      }
      let payloadData
      if (!targetProduct) {
        const { data } = await axios.get(`/api/products/${id}`, {
          cancelToken: source.token,
        })
        payloadData = data
      } else {
        payloadData = targetProduct
      }

      dispatch({
        type: 'DASHBOARD_PRODUCT_DETAIL_SUCCESS',
        payload: payloadData,
      })
    } catch (error: any) {
      dispatch({
        type: 'DASHBOARD_PRODUCT_DETAIL_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
