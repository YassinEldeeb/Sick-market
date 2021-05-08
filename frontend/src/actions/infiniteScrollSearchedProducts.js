import axios from 'axios'

const infiniteScrollProducts = (skip, search) => async (dispatch) => {
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
      `https://sickmarket.ml//api/products/search?find=${search}&skip=${
        skip * 10
      }&limit=${10}`,
      config
    )

    dispatch({
      type: 'INFINITE_SEARCHED_PRODUCTS_SUCCESS',
      payload: data.products,
    })
  } catch (error) {
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
