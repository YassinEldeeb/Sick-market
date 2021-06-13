const initialState = { loading: false }

const canOrder = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CAN_ORDER_REQUEST':
      return { success: false, loading: true }
    case 'CAN_ORDER_SUCCESS':
      return {
        success: true,
        loading: false,
      }
    case 'CAN_ORDER_FAIL':
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default canOrder
