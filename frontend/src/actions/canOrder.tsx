import axios from 'axios'

const canOrderAction =
  (id: any, value: any, search: any) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: 'CAN_ORDER_REQUEST',
      })

      const { userInfo } = getState((state: any) => state.userInfo)
      const { dashboardUsers } = getState((state: any) => state.dashboardUsers)
      const { dashboardSearchUsers } = getState(
        (state: any) => state.dashboardSearchUsers
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
        targetUser = users.find(
          (each: any) => each._id.toString() === id.toString()
        )
      } else if (condition2()) {
        targetUser = sUsers.find(
          (each: any) => each._id.toString() === id.toString()
        )
      }

      await axios.post(`/api/users/canOrder/${id}`, { canOrder: value }, config)
      if (targetUser) targetUser.canOrder = value

      dispatch({
        type: 'CAN_ORDER_SUCCESS',
      })
    } catch (error: any) {
      dispatch({
        type: 'CAN_ORDER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export default canOrderAction
