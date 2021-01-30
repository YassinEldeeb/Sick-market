import axios from "axios"

export const userLogoutAction = () => async (dispatch, getState) => {
  const userInfo = getState().userInfo
  if (userInfo.token) {
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post("/api/users/logout", null, config)
    dispatch({
      type: "USER_LOGOUT",
    })
  }
}

export const userLogoutAllAction = () => async (dispatch, getState) => {
  const userInfo = getState().userInfo
  if (userInfo.token) {
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post("api/users/logoutAll", null, config)
    dispatch({
      type: "USER_LOGOUT_ALL",
    })
  }
}
