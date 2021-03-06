import axios from 'axios'

const createOrderAction =
  (setCartCount: any, isBuyNow: any) =>
  async (dispatch: any, getState: any) => {
    const userInfo = getState().userInfo
    const cart = getState().cart
    const { product } = getState().buyNowProduct

    try {
      dispatch({ type: 'CREATE_ORDER_REQUEST' })
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Content_Type: 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }
      const modifiedCart = () => {
        if (isBuyNow === false) {
          const modified = cart.cartItems.map((eachProduct: any) => {
            return {
              name: eachProduct.name,
              qty: eachProduct.qty,
              image: eachProduct.image,
              price: eachProduct.price,
              product: eachProduct._id,
              removed: eachProduct.removed
                ? eachProduct.removed
                : eachProduct.removed2
                ? eachProduct.removed2
                : null,
            }
          })
          const final = modified.filter((e: any) => {
            if (!e.removed && !e.removed2) return e
          })
          return final
        } else if (!product.removed) {
          return [
            {
              name: product.name,
              qty: product.qty,
              image: product.image,
              price: product.price,
              product: product._id,
            },
          ]
        } else {
          return []
        }
      }

      const { data } = await axios.post(
        '/api/orders',
        {
          user: userInfo.user._id,
          orderItems: modifiedCart().filter((e: any) => e.qty !== 0),
          shippingAddress: {
            address: cart.address.address,
            city: cart.address.city,
            phoneNumber: cart.address.phoneNumber,
            governorate: cart.address.governorate,
            lat: cart.address.location.lat,
            lon: cart.address.location.lon,
            accurate:
              cart.address.addressType === 'Entering another location manualy'
                ? undefined
                : true,
          },
          couponDiscount: cart.couponDiscount
            ? {
                discount: Number(cart.couponDiscount),
                isPercent: cart.discount.code.isPercent,
                info: {
                  code: cart.discount.code.code,
                  codeId: cart.discount.code._id,
                },
              }
            : null,
          paymentMethod: cart.paymentMethod,
          taxPrice: cart.taxes,
          shippingPrice: cart.shipping,
          totalPrice: cart.totalPrice,
          itemsPrice: cart.itemsPrice,
        },
        config
      )
      if (!isBuyNow) {
        localStorage.removeItem('sickCartProducts')
        setCartCount(0)
      }
      cart.discount = null
      dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data })
      if (!isBuyNow) {
        cart.cartItems = []
      }
      cart.taxes = null
      cart.totalPrice = null
      cart.shipping = null
    } catch (error: any) {
      let passedError = null
      if (
        error.response.data.message &&
        isJson(error.response.data.message) &&
        JSON.parse(error.response.data.message).type === 'confirm'
      ) {
        passedError = JSON.parse(error.response.data.message)
      }
      dispatch({
        type: 'CREATE_ORDER_FAIL',
        payload: {
          error: passedError
            ? 'okTrue'
            : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          confirm: passedError ? passedError.error : null,
        },
      })
    }
  }

function isJson(str: any) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export default createOrderAction
