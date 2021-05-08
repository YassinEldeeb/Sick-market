import axios from 'axios'

export const addNewProductAction = (productData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'ADD_PRODUCT_REQUEST' })

    const { userInfo } = getState((state) => state.userInfo)

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }

    const { data } = await axios.post(
      'https://sickmarket.ml/api/products',
      productData,
      config
    )
    if (data && data._id)
      dispatch({
        type: 'ADD_PRODUCT_SUCCESS',
        payload: data,
      })
  } catch (error) {
    dispatch({
      type: 'ADD_PRODUCT_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
