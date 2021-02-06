const initialState = { user: {} }

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { ...state, loading: true, error: null }
    case "USER_LOGIN_SUCCESS":
      return { ...state, loading: false, ...action.payload }
    case "USER_LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload }
    case "USER_LOGOUT":
      localStorage.removeItem("sickUserInfo")
      return { user: {} }
    case "USER_LOGOUT_ALL":
      localStorage.removeItem("sickUserInfo")
      return { user: {} }
    case "CHECK_TOKEN_REQUEST":
      return { ...state, loading: true }
    case "CHECK_TOKEN_SUCCESS":
      return { ...state, validToken: action.payload, loading: false }
    case "CHECK_TOKEN_FAIL":
      return { ...state, loading: false, error: action.payload }
    case "REGISTER_REQUEST":
      return { loading: true, error: null, user: {} }
    case "REGISTER_SUCCESS":
      return { ...state, ...action.payload }
    case "REGISTER_FAIL":
      return { loading: false, error: action.payload }
    case "VERIFY_REQUEST":
      return { ...state, verifyLoading: true, verificationError: null }
    case "VERIFY_SUCCESS":
      state.user.status = "Verified"
      return { ...state, verifyLoading: false }
    case "VERIFY_FAIL":
      return {
        ...state,
        verifyLoading: false,
        verificationError: action.payload,
      }
    case "NEW_VERIFY_CODE_REQUEST":
      return {
        ...state,
        newCodeLoading: true,
        newCodeError: null,
      }
    case "NEW_VERIFY_CODE_SUCCESS":
      return {
        ...state,
        newCodeLoading: false,
      }
    case "NEW_VERIFY_CODE_FAIL":
      return {
        ...state,
        newCodeLoading: false,
        newCodeError: action.payload,
      }
    case "UPDATE_USER_REQUEST":
      return {
        ...state,
        updateLoading: true,
        updated: null,
        updateError: null,
      }
    case "UPDATE_USER_SUCCESS":
      state.user = action.payload
      return {
        ...state,
        updateLoading: false,
        updated: true,
      }
    case "UPDATE_USER_FAIL":
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
        updated: false,
      }
    case "USER_PROFILE_REQUEST":
      return {
        ...state,
        profileLoading: true,
        updated: null,
      }
    case "USER_PROFILE_SUCCESS":
      state.user = action.payload
      return {
        ...state,
        profileLoading: false,
      }
    case "USER_PROFILE_FAIL":
      return {
        ...state,
        updateLoading: false,
        profileError: action.payload,
        updated: false,
      }
    case "DELETE_PROFILE_PIC_REQUEST":
      return {
        ...state,
        deleteProfilePicLoading: true,
      }
    case "DELETE_PROFILE_PIC_SUCCESS":
      state.user.availablePic = false
      if (state.user.profilePicLink) {
        state.user.profilePicLink = "cleared"
      }
      localStorage.setItem(
        "sickUserInfo",
        JSON.stringify({ user: state.user, token: state.token })
      )
      return {
        ...state,
        deleteProfilePicLoading: false,
      }

    case "DELETE_PROFILE_PIC_FAIL":
      return {
        ...state,
        deleteProfilePicLoading: false,
        deleteProfileError: action.payload,
      }
    case "PROFILE_PIC_UPLOADED":
      state.user.availablePic = true
      if (state.user.profilePicLink) {
        state.user.profilePicLink = "cleared"
      }
      localStorage.setItem(
        "sickUserInfo",
        JSON.stringify({ user: state.user, token: state.token })
      )
      return {
        ...state,
      }
    case "CLEAR_ERRORS":
      return {
        ...state,
        deleteProfileError: null,
        profileError: null,
        updateError: null,
        newCodeError: null,
        verificationError: null,
        error: null,
        updated: null,
      }
    default:
      return state
  }
}

export default userReducer
