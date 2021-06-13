const initialState = { loading: false }

const canReview = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CAN_REVIEW_REQUEST':
      return { success: false, loading: true }
    case 'CAN_REVIEW_SUCCESS':
      return {
        success: true,
        loading: false,
      }
    case 'CAN_REVIEW_FAIL':
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default canReview
