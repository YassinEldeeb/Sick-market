import axios from 'axios'

const infiniteScrollProducts =
  (skip: any, search: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: 'INFINITE_SEARCHED_PRODUCTS_REQUEST',
      })
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        cancelToken: source.token,
      }
      const { data } = await axios.get(
        `/api/products/search?find=${search}&skip=${skip * 10}&limit=${10}`,
        config
      )

      dispatch({
        type: 'INFINITE_SEARCHED_PRODUCTS_SUCCESS',
        payload: data.products,
      })
    } catch (error: any) {
      dispatch({
        type: 'INFINITE_SEARCHED_PRODUCTS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export default infiniteScrollProducts
