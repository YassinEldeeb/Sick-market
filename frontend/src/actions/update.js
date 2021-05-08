import axios from 'axios'

const userUpdateAction = (name, email, password, newPassword) => async (
  dispatch,
  getState
) => {
  const userInfo = getState().userInfo
  try {
    dispatch({ type: 'UPDATE_USER_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }
    const passedObj = {}
    const passedObjFN = () => {
      if (name) {
        passedObj.name = name
      }
      if (email) {
        passedObj.email = email
      }
      if (password) {
        passedObj.password = password
      }
      if (newPassword) {
        passedObj.newPassword = newPassword
      }
      return passedObj
    }

    const { data } = await axios.patch(
      'https://sickmarket.ml//api/users/profile',
      passedObjFN(),
      config
    )
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data })

    localStorage.setItem(
      'sickUserInfo',
      JSON.stringify({ user: data, token: userInfo.token })
    )
  } catch (error) {
    dispatch({
      type: 'UPDATE_USER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default userUpdateAction
