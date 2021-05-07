import axios from 'axios'

const checkProduct = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'CHECK_PRODUCTS_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
    const { cartItems } = getState().cart

    const IDsArray = cartItems.map((e) => e._id)

    const { data } = await axios.post(
      'http://localhost:5000/api/products/check',
      { products: IDsArray },
      config
    )

    const productsData = data.products.map((product) => {
      return {
        ...product,
        qty: product._id
          ? Math.min(
              Math.min(
                cartItems.find((e) => e._id === product._id).qty,
                product.qtyPerUser
              ),
              product.countInStock
            )
          : 0,
        removed: data.soldOut.find((e) => e === product._id) ? true : null,
      }
    })
    dispatch({
      type: 'CHECK_PRODUCTS_SUCCESS',
      payload: {
        check: { soldOut: data.soldOut, removed: data.removed },
        products: productsData,
      },
    })
    localStorage.setItem('sickCartProducts', JSON.stringify(productsData))
  } catch (error) {
    dispatch({
      type: 'CHECK_PRODUCTS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default checkProduct
