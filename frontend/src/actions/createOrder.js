import axios from "axios"

const createOrderAction = (setCartCount) => async (dispatch, getState) => {
  const userInfo = getState().userInfo
  const cart = getState().cart

  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" })
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const modifiedCart = cart.cartItems.map((product) => {
      delete product.rating
      delete product.numReviews
      delete product.countInStock
      product.product = product._id
      delete product._id
      return product
    })

    const { data } = await axios.post(
      "/api/orders",
      {
        user: userInfo.user._id,
        orderItems: modifiedCart,
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
    cart.cartItems = []
    cart.taxes = []
    cart.totalPrice = []
    cart.shipping = []
    localStorage.removeItem("sickCartProducts")
    setCartCount(0)

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
