import axios from "axios"

const orderPayAction = (id, paymentResult) => async (dispatch, getState) => {
  const { userInfo } = getState((state) => state.userInfo)

  try {
    dispatch({ type: "ORDER_PAY_REQUEST" })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.patch(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    )
    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "ORDER_PAY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default orderPayAction
