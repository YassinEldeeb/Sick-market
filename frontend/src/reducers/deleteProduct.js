const initialState = { loading: false }

const deleteProduct = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT_REQUEST':
      return { success: false, loading: true }
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        success: true,
        loading: false,
      }
    case 'DELETE_PRODUCT_FAIL':
      return {
        error: action.payload,
        success: false,
        loading: true,
      }
    case 'CONFIRM_DELETE_PRODUCT_REQUEST':
      return {
        ...state,
        asking: true,
        confirm: null,
      }
    case 'CONFIRM_DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        asking: false,
        confirm: true,
      }
    case 'CONFIRM_DELETE_PRODUCT_CANCEL':
      return {
        ...state,
        asking: false,
        confirm: false,
      }
    default:
      return state
  }
}

export default deleteProduct
