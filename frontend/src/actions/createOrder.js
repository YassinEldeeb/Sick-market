import axios from "axios"

const createOrderAction = (setCartCount, isBuyNow) => async (
  dispatch,
  getState
) => {
  const userInfo = getState().userInfo
  const cart = getState().cart
  const { product } = getState().buyNowProduct

  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" })
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const modifiedCart = () => {
      if (isBuyNow === false) {
        return cart.cartItems.map((eachProduct) => {
          delete eachProduct.rating
          delete eachProduct.numReviews
          delete eachProduct.countInStock
          delete eachProduct.brand
          eachProduct.product = eachProduct._id
          delete eachProduct._id
          return eachProduct
        })
      } else {
        delete product.rating
        delete product.numReviews
        delete product.countInStock
        delete product.brand
        product.product = product._id
        delete product._id

        return [product]
      }
    }

    const { data } = await axios.post(
      "/api/orders",
      {
        user: userInfo.user._id,
        orderItems: modifiedCart(),
        shippingAddress: {
          address: cart.address.address,
          city: cart.address.city,
          phoneNumber: cart.address.phoneNumber,
          governorate: cart.address.governorate,
          lat: cart.address.location.lat,
          lon: cart.address.location.lon,
        },
        paymentMethod: cart.paymentMethod,
        taxPrice: cart.taxes,
        shippingPrice: cart.shipping,
        totalPrice: cart.totalPrice,
        itemsPrice: cart.totalPrice - cart.taxes - cart.shipping,
      },
      config
    )
    if (!isBuyNow) {
      cart.cartItems = []
    }
    cart.taxes = null
    cart.totalPrice = null
    cart.shipping = null
    if (!isBuyNow) {
      localStorage.removeItem("sickCartProducts")
      setCartCount(0)
    }

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default createOrderAction
