import axios from 'axios'

const deleteUserAction = (id, value, search) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'EDIT_RANK_REQUEST',
    })

    const { userInfo } = getState((state) => state.userInfo)
    const { dashboardUsers } = getState((state) => state.dashboardUsers)
    const { dashboardSearchUsers } = getState(
      (state) => state.dashboardSearchUsers
    )

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const users = dashboardUsers

    const sUsers = dashboardSearchUsers.users

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }

    const condition = () => {
      if (!search && users.users) {
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
    await axios.post(`/api/users/${id}/rank`, { rank: value }, config)

    if (condition()) {
      users.users = users.users.filter(
        (each) => each._id.toString() !== id.toString()
      )
      users.count -= 1
    } else if (condition2()) {
      dashboardSearchUsers.users = sUsers.filter(
        (each) => each._id.toString() !== id.toString()
      )
      dashboardSearchUsers.count -= 1
    }

    dispatch({
      type: 'EDIT_RANK_SUCCESS',
    })
  } catch (error) {
    dispatch({
      type: 'EDIT_RANK_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default deleteUserAction
