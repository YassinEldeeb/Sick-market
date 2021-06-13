const initialState = { loading: false }

const deleteUser = (state = initialState, action: any) => {
  switch (action.type) {
    case 'DELETE_USER_REQUEST':
      return { success: false, loading: true }
    case 'DELETE_USER_SUCCESS':
      return {
        success: true,
        loading: false,
      }
    case 'DELETE_USER_FAIL':
      return {
        error: action.payload,
        loading: false,
      }
    case 'CONFIRM_DELETE_REQUEST':
      return {
        ...state,
        asking: true,
        confirm: null,
      }
    case 'CONFIRM_DELETE_SUCCESS':
      return {
        ...state,
        asking: false,
        confirm: true,
      }
    case 'CONFIRM_DELETE_CANCEL':
      return {
        ...state,
        asking: false,
        confirm: false,
      }
    default:
      return state
  }
}

export default deleteUser
