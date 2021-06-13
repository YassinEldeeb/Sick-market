const initialState = {
  order: {},
  error: null as any,
  errorConfirm: null as any,
}

const createOrderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST':
      return {
        order: {},
        orderLoading: true,
        error: state.error === 'okTrue' ? state.error : null,
        errorConfirm: state.errorConfirm ? state.errorConfirm : null,
      }
    case 'CREATE_ORDER_SUCCESS':
      return {
        order: action.payload,
        orderCreateLoading: false,
        orderPlaced: true,
      }
    case 'CREATE_ORDER_FAIL':
      return {
        errorConfirm: action.payload.confirm,
        error: action.payload.error,
        orderLoading: false,
        orderPlaced: false,
      }

    default:
      return state
  }
}

export default createOrderReducer
