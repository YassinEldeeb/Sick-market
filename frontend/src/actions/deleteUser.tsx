import axios from 'axios'

const deleteUserAction =
  (id: any, search: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: 'DELETE_USER_REQUEST',
      })

      const { userInfo } = getState((state: any) => state.userInfo)
      const { dashboardUsers } = getState((state: any) => state.dashboardUsers)
      const { dashboardSearchUsers } = getState(
        (state: any) => state.dashboardSearchUsers
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
      await axios.delete(`https://sickmarket.ml/users/${id}`, config)

      if (condition()) {
        users.users = users.users.filter(
          (each: any) => each._id.toString() !== id.toString()
        )
        users.count -= 1
      } else if (condition2()) {
        dashboardSearchUsers.users = sUsers.filter(
          (each: any) => each._id.toString() !== id.toString()
        )
        dashboardSearchUsers.count -= 1
      }

      dispatch({
        type: 'DELETE_USER_SUCCESS',
      })
    } catch (error: any) {
      dispatch({
        type: 'DELETE_USER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export default deleteUserAction
