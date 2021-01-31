const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, error: null }
    case "USER_LOGIN_SUCCESS":
      return { loading: false, ...action.payload }
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload }
    case "USER_LOGOUT":
      localStorage.removeItem("sickUserInfo")
      return {}
    case "USER_LOGOUT_ALL":
      localStorage.removeItem("sickUserInfo")
      return {}
    case "CHECK_TOKEN_REQUEST":
      return { ...state, loading: true }
    case "CHECK_TOKEN_SUCCESS":
      return { ...state, validToken: action.payload, loading: false }
    case "CHECK_TOKEN_FAIL":
      return { ...state, loading: false, error: action.payload }
    case "REGISTER_REQUEST":
      return { loading: true, error: null }
    case "REGISTER_SUCCESS":
      return { ...state, ...action.payload }
    case "REGISTER_FAIL":
      return { loading: false, error: action.payload }
    case "VERIFY_REQUEST":
      return { ...state, verifyLoading: true, verificationError: null }
    case "VERIFY_SUCCESS":
      console.log(state)
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
      }
    case "NEW_VERIFY_CODE_SUCCESS":
      return {
        ...state,
        newCodeLoading: false,
        newCodeError: null,
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
      }
    case "UPDATE_USER_SUCCESS":
      console.log("Payload", action.payload)
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
    default:
      return state
  }
}

export default userReducer
