const initialState = { loading: false }

const deleteUser = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_USER_REQUEST":
      return { success: false, loading: true }
    case "DELETE_USER_SUCCESS":
      return {
        success: true,
        loading: false,
      }
    case "DELETE_USER_FAIL":
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default deleteUser
