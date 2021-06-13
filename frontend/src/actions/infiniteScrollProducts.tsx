import axios from 'axios'

const infiniteScrollProducts =
  (skip: any, filterType: any, filterValue: any, brand: any, category: any) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: 'INFINITE_PRODUCTS_REQUEST',
      })
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        cancelToken: source.token,
      }
      const { data } = await axios.get(
        `/api/products?limit=10&skip=${
          10 * skip
        }&${filterType}=${filterValue}&brand=${brand}&category=${category}`,
        config
      )

      dispatch({
        type: 'INFINITE_PRODUCTS_SUCCESS',
        payload: data.products,
      })
    } catch (error: any) {
      dispatch({
        type: 'INFINITE_PRODUCTS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export default infiniteScrollProducts
