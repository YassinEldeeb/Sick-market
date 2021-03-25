const initialState = { loading: true }
const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_DETAIL_REQUEST":
      return { product: null, loading: true }
    case "PRODUCT_DETAIL_SUCCESS":
      return { product: action.payload, loading: false }
    case "PRODUCT_DETAIL_FAIL":
      return { error: action.payload, loading: false }
    default:
      return state
  }
}

export default productDetailReducer
