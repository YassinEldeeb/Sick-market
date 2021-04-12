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
    case 'UPDATE_SEARCH_PRODUCT_STOCK':
      if (state.products) {
        const products = state.products.map((e) => {
          if (e._id === action.payload.id) {
            e.countInStock = e.countInStock - action.payload.newStock
          }
          return e
        })
        return { ...state, products }
      } else {
        return state
      }
    default:
      return state
  }
}

export default productSearchReducer
