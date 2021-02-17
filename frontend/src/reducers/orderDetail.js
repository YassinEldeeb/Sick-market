const initialState = { order: {} }

const getOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDER_REQUEST":
      return { orderLoading: true, order: {} }
    case "GET_ORDER_SUCCESS":
      return {
        ...action.payload,
        orderLoading: false,
      }
    case "GET_ORDER_FAIL":
      return { error: action.payload, orderLoading: false, order: {} }
    default:
      return state
  }
}

export default getOrderReducer
