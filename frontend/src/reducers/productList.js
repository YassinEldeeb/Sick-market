const initialState = { loading: true }

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { ...state, products: null, loading: true, error: null }
    case 'PRODUCT_LIST_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        count: action.payload.count,
        loading: false,
      }
    case 'PRODUCT_LIST_FAIL':
      return { ...state, error: action.payload, loading: false }
    case 'ADD_PRODUCT_REQUEST':
      return { ...state, newLoading: true, success: false, newError: null }
    case 'ADD_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products ? [action.payload, ...state.products] : null,
        newLoading: false,
        success: true,
        count: state.count + 1,
        newError: null,
      }
    case 'ADD_PRODUCT_FAIL':
      return {
        ...state,
        newLoading: false,
        newError: action.payload,
        success: false,
      }
    case 'SORTING_PRODUCTS_REQUEST':
      return { ...state, filtering: true }
    case 'SORTING_PRODUCTS_SUCCESS':
      return { ...state, filtering: false }
    default:
      return state
  }
}

export default productListReducer
