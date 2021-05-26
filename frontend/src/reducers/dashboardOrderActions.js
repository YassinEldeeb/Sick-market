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
    case 'PAID_DASHBOARD_ORDER_ACTIONS':
      let order
      if (state.order && action.payload._id === state.order._id) {
        order = { ...state.order, isPaid: true, paidAt: action.payload.paidAt }
      } else {
        order = state.order
      }
      return {
        ...state,
        order: order,
      }
    case 'DELIVERED_DASHBOARD_ORDER_ACTIONS':
      let order2
      if (state.order && action.payload._id === state.order._id) {
        order2 = {
          ...state.order,
          isDelivered: true,
          deliveredAt: action.payload.deliveredAt,
        }
      } else {
        order2 = state.order
      }

      return {
        ...state,
        order: order2,
      }
    case 'APPROVE_DASHBOARD_ORDER_ACTIONS':
      let order3
      if (state.order && action.payload._id === state.order._id) {
        order3 = {
          ...state.order,
          approved: action.payload.approved,
        }
      } else {
        order3 = state.order
      }
      return {
        ...state,
        order: order3,
      }
    case 'REJECT_DASHBOARD_ORDER_ACTIONS':
      let order4
      if (state.order && action.payload._id === state.order._id) {
        order4 = {
          ...state.order,
          approved: undefined,
          rejected: action.payload.rejected,
        }
      } else {
        order4 = state.order
      }
      return {
        ...state,
        order: order4,
      }
    case 'PACK_DASHBOARD_ORDER_ACTIONS':
      let order5
      if (state.order && action.payload._id === state.order._id) {
        order5 = {
          ...state.order,
          packed: action.payload.packed,
        }
      } else {
        order5 = state.order
      }
      return {
        ...state,
        order: order5,
      }
    default:
      return state
  }
}

export default orderActions
