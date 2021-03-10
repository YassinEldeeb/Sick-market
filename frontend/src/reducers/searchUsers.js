const initialState = { loading: true }

const searchDashboardUsers = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_DASHBOARD_USERS_REQUEST":
      return { loading: true }
    case "SEARCH_DASHBOARD_USERS_SUCCESS":
      return {
        users: action.payload.users,
        count: action.payload.count,
        loading: false,
      }
    case "SEARCH_DASHBOARD_USERS_FAIL":
      return {
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default searchDashboardUsers
