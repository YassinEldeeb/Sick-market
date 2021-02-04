const initialState = { cartItems: [] }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      state.cartItems.push(action.payload)
      return state
    case "UPDATE_ITEM_QTY":
      state = { cartItems: action.payload }
      return state
    case "REMOVE_ITEM":
      state = { cartItems: action.payload }
      return state
    default:
      return state
  }
}
export default cartReducer
