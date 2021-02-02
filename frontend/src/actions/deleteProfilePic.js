import axios from "axios"

const deleteProfilePicAction = () => async (dispatch, getState) => {
  const { token } = getState().userInfo

  try {
    dispatch({ type: "DELETE_PROFILE_PIC_REQUEST" })
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete("/api/users/me/profilePic", config)
    dispatch({ type: "DELETE_PROFILE_PIC_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "DELETE_PROFILE_PIC_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default deleteProfilePicAction
