const userSavePayment = (data: any) => async (dispatch: any) => {
  dispatch({
    type: 'SAVE_PAYMENT_METHOD',
    payload: data,
  })
  localStorage.setItem('sickPaymentMethod', JSON.stringify(data))
}
const savePromoCode = (discount: any) => async () => {
  if (discount) localStorage.setItem('sickDiscount', JSON.stringify(discount))
}
export { userSavePayment, savePromoCode }
