import axios from 'axios'

export const cartAction =
  (id: any, qty: any) => async (dispatch: any, getState: any) => {
    const state = getState().product.product
    let product = state
    if (Object.keys(product).length === 0) {
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const { data } = await axios.get(`/api/products/${id}`, {
        cancelToken: source.token,
      })
      product = data
    }
    const exist = getState().cart.cartItems.find(
      (product: any) => product._id === id
    )
    if (!exist) {
      dispatch({
        type: 'ADD_ITEM_TO_CART',
        payload: {
          name: product.name,
          qty,
          image: product.image,
          price: product.price,
          _id: product._id,
          rating: product.rating,
          numReviews: product.numReviews,
          countInStock: product.countInStock,
          brand: product.brand,
          qtyPerUser: product.qtyPerUser,
          tinyImage: product.tinyImage,
          freeShipping: product.freeShipping,
        },
      })
    }
    const { cartItems } = getState().cart
    localStorage.setItem('sickCartProducts', JSON.stringify(cartItems))
  }
export const updateQtyAction =
  (match?: any, qty?: any, updateCart?: any) =>
  async (dispatch: any, getState: any) => {
    const { cartItems } = getState().cart
    const matchedWithTheCart = cartItems.find(
      (each: any) => each._id === match._id
    )
    if (matchedWithTheCart.qty !== qty) {
      const updatedArr = cartItems.map((each: any) => {
        if (each._id === match._id) return { ...each, qty }
        return each
      })

      dispatch({ type: 'UPDATE_ITEM_QTY', payload: updatedArr })
      localStorage.setItem('sickCartProducts', JSON.stringify(updatedArr))
    }
  }
export const removeAction =
  (match: any) => async (dispatch: any, getState: any) => {
    const { cartItems } = getState().cart
    const updatedCart = cartItems.filter((each: any) => each._id !== match._id)
    dispatch({
      type: 'REMOVE_ITEM',
      payload: updatedCart,
    })
    localStorage.setItem('sickCartProducts', JSON.stringify(updatedCart))
  }
