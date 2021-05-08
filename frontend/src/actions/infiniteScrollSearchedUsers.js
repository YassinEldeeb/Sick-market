import axios from 'axios'

const infiniteScrollSearchUsersAction = (search, skip = 0) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'INFINITE_SEARCH_USERS_REQUEST',
    })
    const { userInfo } = getState((state) => state.userInfo)
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      cancelToken: source.token,
    }

    const { data } = await axios.post(
      `/api/users/search?limit=10&skip=${10 * skip}`,
      { search },
      config
    )

    if (!data.users.length || data.users.length < 10) {
      dispatch({
        type: 'INFINITE_SEARCH_USERS_END',
      })
    }
    dispatch({
      type: 'INFINITE_SEARCH_USERS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'INFINITE_SEARCH_USERS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default infiniteScrollSearchUsersAction
