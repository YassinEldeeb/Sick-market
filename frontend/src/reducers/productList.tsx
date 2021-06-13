const savedNewProducts = localStorage.getItem('NewProducts')
  ? localStorage.getItem('NewProducts')
  : 0

const initialState = {
  loading: true,
  newProducts: savedNewProducts as any,
  products: null as any,
  count: null as any,
}

const productListReducer = (state = initialState, action: any) => {
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
    case 'NEW_DASHBOARD_PRODUCT':
      localStorage.setItem('NewProducts', state.newProducts + 1)
      return {
        ...state,
        newProducts: (state.newProducts += 1),
      }
    case 'INFINITE_PRODUCTS_REQUEST':
      return {
        ...state,
        infiniteLoading: true,
      }
    case 'INFINITE_PRODUCTS_SUCCESS':
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
    case 'INFINITE_PRODUCTS_FAIL':
      return {
        infiniteLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default productListReducer
