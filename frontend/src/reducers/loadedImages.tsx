const loadedImagesReducer = (state = { loadedImages: [] }, action: any) => {
  switch (action.type) {
    case 'UPDATE_LOADED_IMAGES':
      return { loadedImages: action.payload }
    default:
      return state
  }
}
export default loadedImagesReducer
