import axios from 'axios'
import socket from '../clientSocket/socket'

export const userLogoutAction = () => async (dispatch, getState) => {
  const userInfo = getState().userInfo
  if (userInfo.token) {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    dispatch({ type: 'USER_LOGOUT_REQUEST' })
    try {
      await axios.post('/api/users/logout', null, config)
    } catch (error) {
      dispatch({
        type: 'USER_LOGOUT_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
    dispatch({
      type: 'USER_LOGOUT',
    })
  }
}

export const userLogoutAllAction = () => async (dispatch, getState) => {
  const userInfo = getState().userInfo
  if (userInfo.token) {
    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    dispatch({ type: 'USER_LOGOUT_REQUEST' })

    try {
      await axios.post('api/users/logoutAll', null, config)

      socket.emit('LogoutAllUsers', userInfo.user._id)

      dispatch({
        type: 'USER_LOGOUT_ALL',
      })
    } catch (error) {
      dispatch({
        type: 'USER_LOGOUT_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
