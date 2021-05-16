import React from 'react'

const Rating = ({ ratingValue, numOfReviews }) => {
  const getStars = () => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        stars.push(<i key={`star${i}`} className='fas fa-star'></i>)
      } else if (i - 0.5 <= ratingValue) {
        stars.push(<i key={`star${i}`} className='fas fa-star-half-alt'></i>)
      } else {
        stars.push(<i key={`star${i}`} className='far fa-star'></i>)
      }
    }

    return stars
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
