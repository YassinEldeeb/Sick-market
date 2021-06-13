import axios from 'axios'

const checkProduct = (token: any) => async (dispatch: any, getState: any) => {
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

    const IDsArray = cartItems.map((e: any) => e._id)

    const { data } = await axios.post(
      '/api/products/check',
      { products: IDsArray },
      config
    )

    const productsData = data.products.map((product: any) => {
      return {
        ...product,
        qty: product._id
          ? Math.min(
              Math.min(
                cartItems.find((e: any) => e._id === product._id).qty,
                product.qtyPerUser
              ),
              product.countInStock
            )
          : 0,
        removed: data.soldOut.find((e: any) => e === product._id) ? true : null,
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
  } catch (error: any) {
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
