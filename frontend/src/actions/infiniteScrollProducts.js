import axios from 'axios'

const infiniteScrollProducts = (
  skip,
  filterType,
  filterValue,
  brand,
  category
) => async (dispatch) => {
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
      `https://sickmarket.ml//api/products?limit=10&skip=${
        10 * skip
      }&${filterType}=${filterValue}&brand=${brand}&category=${category}`,
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
