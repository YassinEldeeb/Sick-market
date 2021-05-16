const initialState = {
  cartItems: [],
  address: {},
  paymentMethod: null,
  loadingCheck: true,
  check: {
    soldOut: [],
    removed: [],
  },
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      state.cartItems.push(action.payload)
      return state
    case 'UPDATE_ITEM_QTY':
      state = { ...state, cartItems: action.payload }
      return state
    case 'REMOVE_ITEM':
      state = { ...state, cartItems: action.payload }
      return state
    case 'SAVE_ADDRESS':
      return { ...state, address: action.payload }
    case 'SAVE_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload }
    case 'GEOCODING_REQUEST':
      return { ...state, geocodingLoading: true }
    case 'GEOCODING_SUCCESS':
      return {
        ...state,
        address: action.payload,
        geocodingLoading: false,
        success: true,
      }
    case 'GEOCODING_FAIL':
      return {
        ...state,
        success: false,
        error: action.payload,
        geocodingLoading: false,
      }
    case 'COUPON_REQUEST':
      return { ...state, loadingCoupon: true }
    case 'COUPON_SUCCESS':
      return {
        ...state,
        loadingCoupon: false,
        discount: action.payload,
        errorCoupon: null,
      }
    case 'COUPON_FAIL':
      return {
        ...state,
        loadingCoupon: false,
        errorCoupon: action.payload,
      }
    case 'CHECK_PRODUCTS_REQUEST':
      return {
        ...state,
        loadingCheck: true,
        checkError: null,
        checkProductsSuccess: null,
      }
    case 'CHECK_PRODUCTS_SUCCESS':
      return {
        ...state,
        loadingCheck: false,
        check: action.payload.check,
        cartItems: action.payload.products,
        checkProductsSuccess: true,
      }
    case 'CHECK_PRODUCTS_FAIL':
      return { ...state, loadingCheck: false, checkError: action.payload }

    default:
      return state
  }
}
export default cartReducer
