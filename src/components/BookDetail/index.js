import PropTypes from 'prop-types'
import React from 'react'
import './index.css'

function BookDetail({ book }) {
  return (
    <div className="datail">
      <div className="name">{book.name}</div>
      <div className="description">{book.description || book.name}</div>
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
