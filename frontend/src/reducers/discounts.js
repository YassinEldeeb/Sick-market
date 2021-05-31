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
    default:
      return state
  }
}

export default discounts
