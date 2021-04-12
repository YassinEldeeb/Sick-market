const savedNewProducts = localStorage.getItem('NewProducts')
  ? localStorage.getItem('NewProducts')
  : 0

const initialState = { loading: true, newProducts: savedNewProducts }

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { ...state, products: null, loading: true, error: null }
    case 'PRODUCT_LIST_SUCCESS':
      localStorage.removeItem('NewProducts')

      return {
        ...state,
        products: action.payload.products,
        count: action.payload.count,
        loading: false,
        newProducts: 0,
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
    case 'UPDATE_PRODUCT_STOCK':
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
    case 'NEW_DASHBOARD_PRODUCT':
      localStorage.setItem('NewProducts', state.newProducts + 1)
      return {
        ...state,
        newProducts: (state.newProducts += 1),
      }
    default:
      return state
  }
}

export default productListReducer
