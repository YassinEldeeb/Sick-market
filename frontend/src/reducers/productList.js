const initialState = { products: [] }
const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { products: [], loading: true }
    case "PRODUCT_LIST_SUCCESS":
      return { products: action.payload, loading: false }
    case "PRODUCT_LIST_FAIL":
      return { error: action.payload, loading: false }
    default:
      return state
  }
}

export default productListReducer
