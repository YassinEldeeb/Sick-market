import axios from 'axios'

const userActions = (id, search) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USERS_ACTIONS_REQUEST',
    })

    const { userInfo } = getState((state) => state.userInfo)
    const { dashboardUsers } = getState((state) => state.dashboardUsers)
    const { dashboardSearchUsers } = getState(
      (state) => state.dashboardSearchUsers
    )
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const users = dashboardUsers.users
    const sUsers = dashboardSearchUsers.users
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }

    let targetUser
    const condition = () => {
      if (!search && users) {
        return true
      } else {
        return false
      }
    }
    const condition2 = () => {
      if (search && sUsers) {
        return true
      } else {
        return false
      }
    }
    if (condition()) {
      targetUser = users.find((each) => each._id.toString() === id.toString())
    } else if (condition2()) {
      targetUser = sUsers.find((each) => each._id.toString() === id.toString())
    }
    let payloadData
    if (!targetUser) {
      const { data } = await axios.get(`/api/users/${id}`, config)
      payloadData = data
    } else {
      payloadData = targetUser
    }

    dispatch({
      type: 'USERS_ACTIONS_SUCCESS',
      payload: payloadData,
    })
  } catch (error) {
    dispatch({
      type: 'USERS_ACTIONS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default userActions
