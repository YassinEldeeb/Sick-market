const initialState = { product: {} }

const buyNowProduct = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TO_BUYNOW_CART':
      state.product = action.payload
      return state
    default:
      return state
  }
}
export default buyNowProduct
