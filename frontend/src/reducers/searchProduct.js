const initialState = { loading: false }

const productSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_SEARCH_REQUEST':
      return { ...state, products: null, loading: true, error: null }
    case 'PRODUCT_SEARCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        count: action.payload.count,
        loading: false,
      }
    case 'PRODUCT_SEARCH_FAIL':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default productSearchReducer
