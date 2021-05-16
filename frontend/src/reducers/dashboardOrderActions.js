const initialState = { loading: true, asking: false }

const orderActions = (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER_ACTIONS_REQUEST':
      return { ...state, loading: true }
    case 'ORDER_ACTIONS_SUCCESS':
      return {
        ...state,
        order: action.payload,
        loading: false,
      }
    case 'ORDER_ACTIONS_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'APPROVE_ORDER_REQUEST':
      return {
        ...state,
        loadingApprove: true,
      }
    case 'APPROVE_ORDER_SUCCESS':
      return {
        ...state,
        loadingApprove: false,
        order: action.payload,
      }
    case 'APPROVE_ORDER_FAIL':
      return {
        ...state,
        loadingApprove: false,
        errorApprove: action.payload,
      }
    case 'PACK_ORDER_REQUEST':
      return {
        ...state,
        loadingPack: true,
      }
    case 'PACK_ORDER_SUCCESS':
      return {
        ...state,
        loadingPack: false,
        order: action.payload,
      }
    case 'PACK_ORDER_FAIL':
      return {
        ...state,
        loadingPack: false,
        errorPack: action.payload,
      }
    case 'REJECT_ORDER_CONFIRM_REQUEST':
      return {
        ...state,
        asking: true,
        confirm: false,
      }
    case 'REJECT_ORDER_CONFIRM_SUCCESS':
      return {
        ...state,
        asking: false,
        confirm: true,
      }
    case 'REJECT_ORDER_CONFIRM_FAIL':
      return {
        ...state,
        asking: false,
        confirm: false,
      }
    case 'REJECT_ORDER_CONFIRM_RESET':
      return {
        ...state,
        asking: false,
        confirm: false,
      }
    case 'REJECT_ORDER_REQUEST':
      return {
        ...state,
        rejectLoading: true,
      }
    case 'REJECT_ORDER_SUCCESS':
      return {
        ...state,
        rejectLoading: false,
        order: action.payload,
      }
    case 'REJECT_ORDER_FAIL':
      return {
        ...state,
        errorReject: action.payload,
        rejectLoading: false,
      }
    default:
      return state
  }
}

export default orderActions
