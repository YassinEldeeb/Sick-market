import axios from 'axios'

const resetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({ type: 'RESET_PASSWORD_STEP2_REQUEST' })

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
    await axios.post(
      'https://sickmarket.ml//api/users/resetPassword',
      {
        password,
      },
      config
    )

    dispatch({ type: 'RESET_PASSWORD_STEP2_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'RESET_PASSWORD_STEP2_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default resetPassword
