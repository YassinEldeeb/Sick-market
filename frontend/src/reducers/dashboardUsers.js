const initialState = { loading: true }

const getDashboardUsers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DASHBOARD_USERS_REQUEST":
      return { loading: true }
    case "GET_DASHBOARD_USERS_SUCCESS":
      return {
        users: action.payload.users,
        count: action.payload.count,
        loading: false,
      }
    case "GET_DASHBOARD_USERS_FAIL":
      return {
        error: action.payload,
        loading: false,
      }
    case "APPEND_DASHBOARD_CUSTOMERS":
      return {
        ...state,
        users: [action.payload, ...state.users],
        count: state.count + 1,
      }
    default:
      return state
  }
}

export default getDashboardUsers
