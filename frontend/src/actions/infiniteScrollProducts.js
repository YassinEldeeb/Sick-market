import axios from 'axios'

const infiniteScrollProducts = (skip, filterType, filterValue) => async (
  dispatch
) => {
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
      `/api/products?limit=10&skip=${10 * skip}&${filterType}=${filterValue}`,
      config
    )

    dispatch({
      type: 'INFINITE_PRODUCTS_SUCCESS',
      payload: data.products,
    })
  } catch (error) {
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