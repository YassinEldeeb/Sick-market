import axios from 'axios'

const editProduct =
  (id: any, formData: any, search: any) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: 'DASHBOARD_PRODUCT_EDIT_REQUEST',
      })

      const { userInfo } = getState((state: any) => state.userInfo)
      const state = getState((state: any) => state.productList)
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

      const { data } = await axios.patch(
        `/api/products/${id}`,
        formData,
        config
      )

      let finalArr
      if (productList.products && !search) {
        finalArr = productList.products.map((each: any) => {
          if (each._id.toString() === id.toString()) {
            each = data
          }
          return each
        })
        productList.products = finalArr
      } else if (search && searchedProducts.products) {
        finalArr = searchedProducts.products.map((each: any) => {
          if (each._id.toString() === id.toString()) {
            each = data
          }
          return each
        })
        searchedProducts.products = finalArr
      }

      dispatch({
        type: 'DASHBOARD_PRODUCT_EDIT_SUCCESS',
      })
    } catch (error: any) {
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
