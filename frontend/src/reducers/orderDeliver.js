const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_DELIVER_REQUEST':
      return { error: null, orderDeliverLoading: true }
    case 'ORDER_DELIVER_SUCCESS':
      return {
        date: action.payload,
        deliverSuccess: true,
        orderDeliverLoading: false,
      }
    case 'ORDER_DELIVER_FAIL':
      return {
        error: action.payload,
        orderDeliverLoading: false,
      }
    case 'ORDER_DELIVER_RESET':
      return {}
    default:
      return state
  }
}
export default orderDeliverReducer
