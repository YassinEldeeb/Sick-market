const initialState = { loading: true, newUsers: 0 }

const getDashboardUsers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DASHBOARD_USERS_REQUEST":
      return { newUsers: state.newUsers, loading: true }
    case "GET_DASHBOARD_USERS_SUCCESS":
      return {
        users: action.payload.users,
        count: action.payload.count,
        loading: false,
        newUsers: 0,
      }
    case "GET_DASHBOARD_USERS_FAIL":
      return {
        error: action.payload,
        loading: false,
        newUsers: state.newUsers,
      }
    case "NEW_DASHBOARD_USERS":
      return {
        ...state,
        newUsers: (state.newUsers += 1),
      }
    default:
      return state
  }
}

export default getDashboardUsers
