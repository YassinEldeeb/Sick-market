import axios from 'axios'

const userUpdateAction =
  (name?: any, email?: any, password?: any, newPassword?: any) =>
  async (dispatch: any, getState: any) => {
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
      const passedObj: any = {}
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
        '/api/users/profile',
        passedObjFN(),
        config
      )
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data })

      localStorage.setItem(
        'sickUserInfo',
        JSON.stringify({ user: data, token: userInfo.token })
      )
    } catch (error: any) {
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
