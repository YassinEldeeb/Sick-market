const userSavePayment = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_PAYMENT_METHOD",
    payload: data,
  })
  localStorage.setItem("sickPaymentMethod", JSON.stringify(data))
}
const savePromoCode = (discount) => async () => {
  console.log(discount)
  if (discount) localStorage.setItem("sickDiscount", JSON.stringify(discount))
}
export { userSavePayment, savePromoCode }
