import React from 'react'
import './index.css'
import Review from './Review'

export default (props) => {
  return (
    <div className="reviews-container">
      {props.reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  )
}
