import PropTypes from 'prop-types'
import React from 'react'

function BookDetail({ book }) {
  return (
    <div className="datail">
      <div className="name">{book.name}</div>
      <div className="description">{book.description}</div>
    </div>
  )
}

BookDetail.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  })
}

export default BookDetail
