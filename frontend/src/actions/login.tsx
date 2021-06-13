import axios from 'axios'

const userLoginAction =
  (email: any, password: any) => async (dispatch: any) => {
    try {
      dispatch({ type: 'USER_LOGIN_REQUEST' })
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      const config = {
        headers: {
          Content_Type: 'application/json',
        },
        cancelToken: source.token,
      }
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
      if (data) localStorage.setItem('sickUserInfo', JSON.stringify(data))
    } catch (error: any) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
      localStorage.removeItem('sickUserInfo')
    }
  }

export default userLoginAction
