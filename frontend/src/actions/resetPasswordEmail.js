import axios from 'axios'

const resetPasswordEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'RESET_PASSWORD_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    await axios.post(
      '/api/users/resetPasswordEmail',
      {
        email,
      },
      { cancelToken: source.token }
    )

    dispatch({ type: 'RESET_PASSWORD_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'RESET_PASSWORD_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default resetPasswordEmail
