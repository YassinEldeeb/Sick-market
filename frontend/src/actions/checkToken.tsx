import axios from 'axios'

const checkToken = (token: any) => async (dispatch: any) => {
  try {
    dispatch({ type: 'CHECK_TOKEN_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
    await axios.post('/api/users/checkToken', null, config)
    dispatch({ type: 'CHECK_TOKEN_SUCCESS', payload: true })
  } catch (error: any) {
    if (error && error.response && error.response.status === 401) {
      dispatch({ type: 'USER_LOGOUT' })
      localStorage.removeItem('sickUserInfo')
      dispatch({ type: 'CHECK_TOKEN_SUCCESS', payload: false })
    } else {
      dispatch({
        type: 'CHECK_TOKEN_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export default checkToken
