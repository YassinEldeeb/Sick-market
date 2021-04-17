const initialState = { order: {} }
const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST':
      return { order: {}, orderLoading: true }
    case 'CREATE_ORDER_SUCCESS':
      return {
        order: action.payload,
        orderCreateLoading: false,
        orderPlaced: true,
      }
    case 'CREATE_ORDER_FAIL':
      return {
        error: action.payload,
        orderLoading: false,
        orderPlaced: false,
      }
    default:
      return state
  }
}

export default createOrderReducer
