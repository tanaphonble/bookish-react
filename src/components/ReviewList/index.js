import React from 'react'

export default (props) => {
  return (
    <div className="reviews-container">
      {props.reviews.map((review) => (
        <div key={`${review.id}`} className="review">
          {review.content}
        </div>
      ))}
    </div>
  )
}
