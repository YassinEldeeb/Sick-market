const initialState = { loading: false, products: null as any }

const productSearchReducer = (state = initialState, action: any) => {
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
    case 'UPDATE_SEARCH_PRODUCT_STOCK':
      if (state.products) {
        const products = state.products.map((e: any) => {
          if (e._id === action.payload.id) {
            e.countInStock = e.countInStock - action.payload.newStock
          }
          return e
        })
        return { ...state, products }
      } else {
        return state
      }
    case 'INFINITE_SEARCHED_PRODUCTS_REQUEST':
      return {
        ...state,
        infiniteLoading: true,
      }
    case 'INFINITE_SEARCHED_PRODUCTS_SUCCESS':
      let value
      if (state.products) {
        value = [...state.products, ...action.payload]
      } else {
        value = [...action.payload]
      }
      return {
        ...state,
        products: value,
        infiniteLoading: false,
      }
    case 'INFINITE_SEARCHED_PRODUCTS_FAIL':
      return {
        infiniteLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default productSearchReducer
