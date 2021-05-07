import axios from 'axios'

const userRegisterAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_REQUEST' })

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: 'application/json',
      },
      cancelToken: source.token,
    }

    const { data } = await axios.post(
      'http://localhost:5000/api/users',
      { name, email, password },
      config
    )
    dispatch({ type: 'REGISTER_SUCCESS' })
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
    if (data) localStorage.setItem('sickUserInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    localStorage.removeItem('sickUserInfo')
  }
}
export default userRegisterAction
