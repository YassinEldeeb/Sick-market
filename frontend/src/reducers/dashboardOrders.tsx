const initialState = { loading: true, orders: null as any }

const getDashboardOrders = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_DASHBOARD_ORDERS_REQUEST':
      return { ...state, loading: true }
    case 'SORTING_ORDERS_REQUEST':
      return { ...state, filtering: true }
    case 'GET_DASHBOARD_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload.orders,
        count: action.payload.count,
        loading: false,
        filtering: false,
      }
    case 'GET_DASHBOARD_ORDERS_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
        filtering: false,
      }
    case 'PAID_DASHBOARD_ORDER':
      let modifiedOrders
      if (state.orders) {
        modifiedOrders = state.orders.map((e: any) => {
          if (e._id === action.payload._id) {
            return { ...e, isPaid: true, paidAt: action.payload.paidAt }
          } else {
            return e
          }
        })
      } else {
        modifiedOrders = undefined
      }

      return {
        ...state,
        orders: modifiedOrders,
      }
    case 'DELIVERED_DASHBOARD_ORDER':
      let modifiedOrders2
      if (state.orders) {
        modifiedOrders2 = state.orders.map((e: any) => {
          if (e._id === action.payload._id) {
            return {
              ...e,
              isDelivered: true,
              delivredAt: action.payload.delivredAt,
            }
          } else {
            return e
          }
        })
      } else {
        modifiedOrders2 = undefined
      }

      return {
        ...state,
        orders: modifiedOrders2,
      }
    case 'APPROVED_DASHBOARD_ORDER':
      let modifiedOrders3
      if (state.orders) {
        modifiedOrders3 = state.orders.map((e: any) => {
          if (e._id === action.payload._id) {
            return {
              ...e,
              approved: action.payload.approved,
            }
          } else {
            return e
          }
        })
      } else {
        modifiedOrders3 = undefined
      }

      return {
        ...state,
        orders: modifiedOrders3,
      }
    case 'REJECTED_DASHBOARD_ORDER':
      let modifiedOrders4
      if (state.orders) {
        modifiedOrders4 = state.orders.map((e: any) => {
          if (e._id === action.payload._id) {
            return {
              ...e,
              rejected: action.payload.rejected,
              approved: undefined,
            }
          } else {
            return e
          }
        })
      } else {
        modifiedOrders4 = undefined
      }

      return {
        ...state,
        orders: modifiedOrders4,
      }
    case 'PACKED_DASHBOARD_ORDER':
      let modifiedOrders5
      if (state.orders) {
        modifiedOrders5 = state.orders.map((e: any) => {
          if (e._id === action.payload._id) {
            return {
              ...e,
              packed: action.payload.packed,
            }
          } else {
            return e
          }
        })
      } else {
        modifiedOrders5 = undefined
      }

      return {
        ...state,
        orders: modifiedOrders5,
      }
    case 'INFINITE_ORDERS_REQUEST':
      return {
        ...state,
        infiniteLoading: true,
      }
    case 'INFINITE_ORDERS_SUCCESS':
      let value
      if (state.orders) {
        value = [...state.orders, ...action.payload]
      } else {
        value = [...action.payload]
      }
      return {
        ...state,
        orders: value,
        infiniteLoading: false,
      }
    case 'INFINITE_ORDERS_FAIL':
      return {
        infiniteLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default getDashboardOrders
