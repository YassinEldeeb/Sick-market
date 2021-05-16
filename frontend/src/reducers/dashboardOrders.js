const initialState = { loading: true }

const getDashboardOrders = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DASHBOARD_ORDERS_REQUEST':
      return { loading: true }
    case 'GET_DASHBOARD_ORDERS_SUCCESS':
      return {
        orders: action.payload.orders,
        count: action.payload.count,
        loading: false,
      }
    case 'GET_DASHBOARD_ORDERS_FAIL':
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default getDashboardOrders
