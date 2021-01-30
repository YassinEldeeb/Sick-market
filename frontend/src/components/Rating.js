import React from "react"

const Rating = ({ ratingValue, numOfReviews }) => {
  const getStars = () => {
    const stars = []
    const renderedStars = []
    const rating = Math.round(ratingValue * 10) / 10
    for (let i = 0.5; i < 5; i += 0.5) {
      if (rating >= i) {
        stars.push(0.5)
      }
    }
    if (Number.isInteger(stars.length / 2)) {
      for (let i = 0; i < stars.length / 2; i++) {
        renderedStars.push(
          <i key={`star${renderedStars.length}`} className='fas fa-star'></i>
        )
      }
    } else {
      for (let i = 0; i < Math.floor(stars.length / 2); i++) {
        renderedStars.push(
          <i key={`star${renderedStars.length}`} className='fas fa-star'></i>
        )
      }
      renderedStars.push(
        <i
          key={`star${renderedStars.length}`}
          className='fas fa-star-half-alt'
        ></i>
      )
    }

    while (renderedStars.length < 5) {
      for (let i = 0; i < 5 - renderedStars.length; i++) {
        renderedStars.push(
          <i key={`star${renderedStars.length}`} className='far fa-star'></i>
        )
      }
    }
    return renderedStars
  }
  return (
    <div className='starsRating'>
      {getStars()}
      <div className='ratingCount'>
        <span>({numOfReviews})</span>
      </div>
    </div>
  )
}

export default Rating
