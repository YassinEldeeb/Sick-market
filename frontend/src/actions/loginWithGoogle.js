import axios from 'axios'
import dotenv from 'dotenv'

const loginWithGoogle = (name, email, profilePic) => async (dispatch) => {
  dotenv.config()
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
    const googleSignture = '214GOOGLEyassinSIGNTURE123SICK.21S16123P9jhnG6h'
    const { data } = await axios.post(
      'https://sickmarket.ml//api/users/googleOauth',
      { name, email, profilePicLink: profilePic, googleSignture },
      config
    )
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
    localStorage.setItem('sickUserInfo', JSON.stringify(data))
  } catch (error) {
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
export default loginWithGoogle
