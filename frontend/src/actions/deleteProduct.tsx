import axios from 'axios'

const deleteProduct =
  (id: any, search: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: 'DELETE_PRODUCT_REQUEST',
        payload: id,
      })

      const { userInfo } = getState((state: any) => state.userInfo)
      const state = getState((state: any) => state.productList)
      const products = { ...state.productList }
      const searchedProducts = state.productSearch
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
        } else if (search && searchedProducts.products) {
          return true
        } else {
          return false
        }
      }
      await axios.delete(`/api/products/${id}`, config)
      if (condition() && !search) {
        products.products = products.products.filter(
          (each: any) => each._id.toString() !== id.toString()
        )
        products.count -= 1
        state.productList = { ...products }
      } else if (condition() && search) {
        searchedProducts.products = searchedProducts.products.filter(
          (each: any) => each._id.toString() !== id.toString()
        )
        searchedProducts.count -= 1
        state.productSearch = { ...searchedProducts }
      }

      dispatch({
        type: 'DELETE_PRODUCT_SUCCESS',
      })
    } catch (error: any) {
      dispatch({
        type: 'DELETE_PRODUCT_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export default deleteProduct
