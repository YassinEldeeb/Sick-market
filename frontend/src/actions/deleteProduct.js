import axios from "axios"

const deleteProduct = (id, search) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DELETE_PRODUCT_REQUEST",
    })

    const { userInfo } = getState((state) => state.userInfo)
    const state = getState((state) => state.productList)
    const products = { ...state.productList }

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }

    const condition = () => {
      if (!search && products.products) {
        return true
      } else {
        return false
      }
    }
    await axios.delete(`/api/products/${id}`, config)
    if (condition()) {
      products.products = products.products.filter(
        (each) => each._id.toString() !== id.toString()
      )
      products.count -= 1
      state.productList = { ...products }
    }

    dispatch({
      type: "DELETE_PRODUCT_SUCCESS",
    })
  } catch (error) {
    dispatch({
      type: "DELETE_PRODUCT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default deleteProduct
