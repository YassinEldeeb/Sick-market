const initialState = { loading: false }

const deleteDiscount = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_DISCOUNT_REQUEST':
      return { success: false, loading: true, discount: action.payload }
    case 'DELETE_DISCOUNT_SUCCESS':
      return {
        success: true,
        loading: false,
      }
    case 'DELETE_DISCOUNT_FAIL':
      return {
        error: action.payload,
        success: false,
        loading: true,
      }
    case 'CONFIRM_DELETE_DISCOUNT_REQUEST':
      return {
        ...state,
        asking: true,
        confirm: null,
      }
    case 'CONFIRM_DELETE_DISCOUNT_SUCCESS':
      return {
        ...state,
        asking: false,
        confirm: true,
      }
    case 'CONFIRM_DELETE_DISCOUNT_CANCEL':
      return {
        ...state,
        asking: false,
        confirm: false,
      }
    default:
      return state
  }
}

export default deleteDiscount
