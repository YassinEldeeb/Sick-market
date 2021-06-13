const orderPayReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'ORDER_PAY_REQUEST':
      return { error: null, orderPayLoading: true }
    case 'ORDER_PAY_SUCCESS':
      return { success: true, orderPayLoading: false }
    case 'ORDER_PAY_FAIL':
      return {
        error: action.payload,
        orderPayLoading: false,
      }
    case 'ORDER_PAY_RESET':
      return {}
    default:
      return state
  }
}

export default orderPayReducer
