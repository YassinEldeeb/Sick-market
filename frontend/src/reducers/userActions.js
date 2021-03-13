const initialState = { loading: true }

const userActions = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_ACTIONS_REQUEST":
      return { loading: true }
    case "USERS_ACTIONS_SUCCESS":
      return {
        user: action.payload,
        loading: false,
      }
    case "USERS_ACTIONS_FAIL":
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default userActions
