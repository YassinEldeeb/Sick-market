const userSaveAddress = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_ADDRESS",
    payload: data,
  })
  localStorage.setItem("sickAddress", JSON.stringify(data))
}
export default userSaveAddress
