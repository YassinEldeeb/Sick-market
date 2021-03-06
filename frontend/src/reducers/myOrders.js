const getAllOrdersReducer = (state = { loadingOrders: true }, action) => {
  switch (action.type) {
    case "GET_MY_ORDERS_REQUEST":
      return { loadingOrders: true }
    case "GET_MY_ORDERS_SUCCESS":
      return { orders: action.payload, loadingOrders: false }
    case "GET_MY_ORDERS_FAIL":
      return { error: action.payload, loadingOrders: false }
    default:
      return state
  }
}
export default getAllOrdersReducer
