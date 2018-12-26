import PropTypes from 'prop-types'
import React from 'react'

function BookList({ error, loading, books }) {
  if (error) {
    return <div className="error" />
  }

  if (loading) {
    return <div className="loading" />
  }

  return (
    <div className="books">
      {books.map((book) => (
        <div key={`${book.id}`} className="book">
          <h2 className="title">{book.name}</h2>
          <a href={`/books/${book.id}`} className="view-detail">
            View Detail
          </a>
        </div>
      ))}
    </div>
  )
}

BookList.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
}

export default BookList
