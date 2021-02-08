const initialState = { cartItems: [], address: {}, paymentMethod: null }

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      state.cartItems.push(action.payload)
      return state
    case "UPDATE_ITEM_QTY":
      state = { ...state, cartItems: action.payload }
      return state
    case "REMOVE_ITEM":
      state = { ...state, cartItems: action.payload }
      return state
    case "SAVE_ADDRESS":
      return { ...state, address: action.payload }
    case "SAVE_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload }
    case "GEOCODING_REQUEST":
      return { ...state, geocodingLoading: true }
    case "GEOCODING_SUCCESS":
      return {
        ...state,
        address: action.payload,
        geocodingLoading: false,
      }
    case "GEOCODING_FAIL":
      return { ...state, error: action.payload, geocodingLoading: false }
    default:
      return state
  }
}
export default cartReducer
