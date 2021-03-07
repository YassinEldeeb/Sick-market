import axios from "axios"

const getMyOrdersAction = () => async (dispatch, getState) => {
  const { userInfo } = getState((state) => state.userInfo)

  try {
    dispatch({ type: "GET_MY_ORDERS_REQUEST" })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/myOrders?limit=8`, config)
    dispatch({ type: "GET_MY_ORDERS_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "GET_MY_ORDERS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getMyOrdersAction
