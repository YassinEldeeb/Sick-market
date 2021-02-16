import axios from "axios"

const addCouponAction = (code) => async (dispatch, getState) => {
  const { token } = getState().userInfo
  dispatch({ type: "COUPON_REQUEST" })
  try {
    const config = {
      headers: {
        Content_Type: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    const codeResponse = await axios.post("/api/coupons/use", { code }, config)
    dispatch({
      type: "COUPON_SUCCESS",
      payload: codeResponse.data,
    })
  } catch (error) {
    dispatch({
      type: "COUPON_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export default addCouponAction
