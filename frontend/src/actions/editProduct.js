import axios from 'axios'

const editProduct = (id, formData, search) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'DASHBOARD_PRODUCT_EDIT_REQUEST',
    })

    const { userInfo } = getState((state) => state.userInfo)
    const state = getState((state) => state.productList)
    const productList = state.productList
    const searchedProducts = state.productSearch

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }

    const { data } = await axios.patch(`/api/products/${id}`, formData, config)

    let finalArr
    if (productList.products && !search) {
      finalArr = productList.products.map((each) => {
        if (each._id.toString() === id.toString()) {
          each = data
        }
        return each
      })
      productList.products = finalArr
    } else if (search && searchedProducts.products) {
      finalArr = searchedProducts.products.map((each) => {
        if (each._id.toString() === id.toString()) {
          each = data
          console.log(each)
        }
        return each
      })
      searchedProducts.products = finalArr
    }

    dispatch({
      type: 'DASHBOARD_PRODUCT_EDIT_SUCCESS',
    })
  } catch (error) {
    dispatch({
      type: 'DASHBOARD_PRODUCT_EDIT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default editProduct
