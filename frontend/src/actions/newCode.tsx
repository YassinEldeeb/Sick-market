import axios from 'axios'

export const newCodeAction = () => async (dispatch: any, getState: any) => {
  dispatch({ type: 'NEW_VERIFY_CODE_REQUEST' })
  const userInfo = getState().userInfo
  if (userInfo.token && userInfo.user.status === 'pending') {
    try {
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Content_Type: 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        cancelToken: source.token,
      }
      await axios.get('/api/users/getNewSecurityCode', config)
      dispatch({ type: 'NEW_VERIFY_CODE_SUCCESS' })
    } catch (error: any) {
      dispatch({
        type: 'NEW_VERIFY_CODE_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
export default newCodeAction
