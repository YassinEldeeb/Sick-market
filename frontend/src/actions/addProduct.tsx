import axios from 'axios'

export const addNewProductAction =
  (productData: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: 'ADD_PRODUCT_REQUEST' })

      const { userInfo } = getState((state: any) => state.userInfo)

      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }

      const { data } = await axios.post('/api/products', productData, config)
      if (data && data._id)
        dispatch({
          type: 'ADD_PRODUCT_SUCCESS',
          payload: data,
        })
    } catch (error: any) {
      dispatch({
        type: 'ADD_PRODUCT_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
