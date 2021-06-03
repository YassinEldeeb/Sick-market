const initialState = { loading: false }

const discounts = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DISCOUNTS_REQUEST':
      return { loading: true }
    case 'GET_DISCOUNTS_SUCCESS':
      return {
        discounts: action.payload.discounts,
        count: action.payload.count,
        loading: false,
      }
    case 'GET_DISCOUNTS_FAIL':
      return {
        error: action.payload,
        loading: false,
      }
    case 'INFINITE_DISCOUNTS_REQUEST':
      return { ...state, infiniteLoading: true }
    case 'INFINITE_DISCOUNTS_SUCCESS':
      return {
        ...state,
        discounts: [...state.discounts, ...action.payload],
        infiniteLoading: false,
      }
    case 'INFINITE_DISCOUNTS_FAIL':
      return {
        ...state,
        error: action.payload,
        infiniteLoading: false,
      }
    case 'CREATE_DISCOUNT_REQUEST':
      return {
        ...state,
        createLoading: true,
        createError: null,
      }
    case 'CREATE_DISCOUNT_SUCCESS':
      return {
        ...state,
        discounts: state.discounts
          ? [action.payload, ...state.discounts]
          : null,
        createLoading: false,
        success: true,
        count: state.count + 1,
        createError: null,
      }
    case 'CREATE_DISCOUNT_FAIL':
      return {
        ...state,
        createError: action.payload,
        createLoading: false,
      }
    case 'CREATE_DISCOUNT_RESET':
      return {
        ...state,
        success: false,
      }
    default:
      return state
  }
}

export default discounts
