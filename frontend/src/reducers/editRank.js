const initialState = { loading: false }

const editRank = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_RANK_REQUEST":
      return { success: false, loading: true }
    case "EDIT_RANK_SUCCESS":
      return {
        success: true,
        loading: false,
      }
    case "EDIT_RANK_FAIL":
      return {
        error: action.payload,
        loading: false,
      }
    case "CONFIRM_RANK_REQUEST":
      return {
        ...state,
        asking: true,
        confirm: null,
      }
    case "CONFIRM_RANK_SUCCESS":
      return {
        ...state,
        asking: false,
        confirm: true,
      }
    case "CONFIRM_RANK_CANCEL":
      return {
        ...state,
        asking: false,
        confirm: false,
      }
    default:
      return state
  }
}

export default editRank
