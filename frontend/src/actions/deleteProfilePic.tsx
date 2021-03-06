import axios from 'axios'

const deleteProfilePicAction = () => async (dispatch: any, getState: any) => {
  const { token } = getState().userInfo

  try {
    dispatch({ type: 'DELETE_PROFILE_PIC_REQUEST' })
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
    const { data } = await axios.delete('/api/users/me/profilePic', config)
    dispatch({ type: 'DELETE_PROFILE_PIC_SUCCESS', payload: data })
  } catch (error: any) {
    dispatch({
      type: 'DELETE_PROFILE_PIC_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default deleteProfilePicAction
