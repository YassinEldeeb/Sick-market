const initialState = { loading: true }
const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_DETAIL_REQUEST":
      return { product: null, loading: true }
    case "PRODUCT_DETAIL_SUCCESS":
      return { product: action.payload, loading: false }
    case "PRODUCT_DETAIL_FAIL":
      return { error: action.payload, loading: false }
    case "DASHBOARD_PRODUCT_DETAIL_REQUEST":
      return { dashboardProduct: null, loading: true }
    case "DASHBOARD_PRODUCT_DETAIL_SUCCESS":
      return { dashboardProduct: action.payload, loading: false }
    case "DASHBOARD_PRODUCT_DETAIL_FAIL":
      return { error: action.payload, loading: false }
    case "DASHBOARD_PRODUCT_EDIT_REQUEST":
      return { ...state, editLoading: true, editSuccess: false }
    case "DASHBOARD_PRODUCT_EDIT_SUCCESS":
      return {
        ...state,
        editLoading: false,
        dashboardProduct: action.payload,
        editSuccess: true,
      }
    case "DASHBOARD_PRODUCT_EDIT_FAIL":
      return {
        ...state,
        error: action.payload,
        editLoading: false,
        editSuccess: false,
      }
    default:
      return state
  }
}

export default productDetailReducer
