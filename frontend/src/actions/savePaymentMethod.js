const userSavePayment = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_PAYMENT_METHOD",
    payload: data,
  })
  localStorage.setItem("sickPaymentMethod", JSON.stringify(data))
}
export default userSavePayment
