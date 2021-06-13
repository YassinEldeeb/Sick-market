const initialState = { loading: true, users: null as any }

const searchDashboardUsers = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SEARCH_DASHBOARD_USERS_REQUEST':
      return { loading: true }
    case 'SEARCH_DASHBOARD_USERS_SUCCESS':
      return {
        users: action.payload.users,
        count: action.payload.count,
        loading: false,
      }
    case 'SEARCH_DASHBOARD_USERS_FAIL':
      return {
        error: action.payload,
        loading: false,
      }
    case 'INFINITE_SEARCH_USERS_REQUEST':
      return {
        ...state,
        infiniteLoading: true,
      }
    case 'INFINITE_SEARCH_USERS_SUCCESS':
      return {
        ...state,
        users: [...state.users, ...action.payload.users],
        infiniteLoading: false,
        success: true,
      }
    case 'INFINITE_SEARCH_USERS_FAIL':
      return {
        infiniteLoading: false,
        error: action.payload,
      }
    case 'INFINITE_SEARCH_USERS_END':
      return {
        ...state,
        end: true,
      }
    default:
      return state
  }
}

export default searchDashboardUsers
