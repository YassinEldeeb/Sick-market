import axios from "axios"

export const cartAction = (id, qty) => async (dispatch, getState) => {
  const state = getState().product.product
  let product = state
  if (Object.keys(product).length === 0) {
    const { data } = await axios.get(`/api/products/${id}`)
    product = data
  }
  const exist = getState().cart.cartItems.find((product) => product._id === id)
  if (!exist) {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: { ...product, qty },
    })
  }
  const { cartItems } = getState().cart
  localStorage.setItem("sickCartProducts", JSON.stringify(cartItems))
}
export const updateQtyAction = (match, qty) => async (dispatch, getState) => {
  const { cartItems } = getState().cart
  const matchedWithTheCart = cartItems.find((each) => each._id === match._id)
  if (matchedWithTheCart.qty !== qty) {
    const updatedArr = cartItems.map((each) => {
      if (each._id === match._id) return { ...each, qty }
      return each
    })

    dispatch({ type: "UPDATE_ITEM_QTY", payload: updatedArr })
    localStorage.setItem("sickCartProducts", JSON.stringify(updatedArr))
  }
}
export const removeAction = (match) => async (dispatch, getState) => {
  const { cartItems } = getState().cart
  const updatedCart = cartItems.filter((each) => each._id !== match._id)
  dispatch({
    type: "REMOVE_ITEM",
    payload: updatedCart,
  })
  localStorage.setItem("sickCartProducts", JSON.stringify(updatedCart))
}
