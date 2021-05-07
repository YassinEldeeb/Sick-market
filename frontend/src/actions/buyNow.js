export const buyNowAction = (qty) => async (dispatch, getState) => {
  const state = getState().product.product
  let product = state

  dispatch({
    type: 'ADD_TO_BUYNOW_CART',
    payload: {
      name: product.name,
      qty,
      image: 'http://localhost:5000' + product.image,
      price: product.price,
      _id: product._id,
      rating: product.rating,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
      brand: product.brand,
    },
  })
}
