import axios from 'axios'

const userProfileAction = () => async (dispatch, getState) => {
  const { token, user } = getState().userInfo

  try {
    dispatch({ type: 'USER_PROFILE_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
    const { data } = await axios.get('/api/users/profile', config)

    dispatch({ type: 'USER_PROFILE_SUCCESS', payload: data })
    if (data)
      localStorage.setItem(
        'sickUserInfo',
        JSON.stringify({ user: data, token })
      )
  } catch (error) {
    dispatch({
      type: 'USER_PROFILE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default userProfileAction
