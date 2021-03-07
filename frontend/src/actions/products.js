import axios from "axios"

export const productListAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const { data } = await axios.get("/api/products", {
      cancelToken: source.token,
    })
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productDetailAction = (id) => async (dispatch) => {
  try {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    dispatch({ type: "PRODUCT_DETAIL_REQUEST" })
    const { data } = await axios.get(`/api/products/${id}`, {
      cancelToken: source.token,
    })
    dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
