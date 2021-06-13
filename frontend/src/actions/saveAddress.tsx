const userSaveAddress = (data: any) => async (dispatch: any) => {
  dispatch({
    type: 'SAVE_ADDRESS',
    payload: data,
  })
  localStorage.setItem('sickAddress', JSON.stringify(data))
}
export default userSaveAddress
