import axios from "axios"

export const productListAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    const { data } = await axios.get("/api/products?order=newest", {
      cancelToken: source.token,
    })
    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    })
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
export const DashboardProductDetailAction = (id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "DASHBOARD_PRODUCT_DETAIL_REQUEST" })

    const state = getState((state) => state.productList)
    const productList = state.productList

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    let targetProduct
    const condition = () => {
      if (productList.products) {
        return true
      } else {
        return false
      }
    }
    if (condition()) {
      targetProduct = productList.products.find(
        (each) => each._id.toString() === id.toString()
      )
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
      type: "DASHBOARD_PRODUCT_DETAIL_SUCCESS",
      payload: payloadData,
    })
  } catch (error) {
    dispatch({
      type: "DASHBOARD_PRODUCT_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
