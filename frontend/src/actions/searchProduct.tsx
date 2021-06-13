import axios from 'axios'

const searchProducts = (search: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: 'PRODUCT_SEARCH_REQUEST',
    })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      cancelToken: source.token,
    }
    const { data } = await axios.get(
      `/api/products/search?find=${search}&limit=${10}`,
      config
    )
    dispatch({
      type: 'PRODUCT_SEARCH_SUCCESS',
      payload: data,
    })
  } catch (error: any) {
    dispatch({
      type: 'PRODUCT_SEARCH_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default searchProducts
