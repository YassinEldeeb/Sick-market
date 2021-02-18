const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return { error: null, orderPayLoading: true }
    case "ORDER_PAY_SUCCESS":
      return { success: true, orderPayLoading: false }
    case "ORDER_PAY_FAIL":
      return {
        error: action.payload,
        orderPayLoading: false,
      }
    case "ORDER_PAY_FAIL":
      return {}
    default:
      return state
  }
}

export default orderPayReducer
