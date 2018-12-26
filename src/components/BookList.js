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
      {books.map((book, index) => (
        <div key={`${book.name}_${index}`} className="book">
          <h2 className="title">{book.name}</h2>
          <a href={`/books/${book.id}`} className="view-detail">
            View Detail
          </a>
        </div>
      ))}
    </div>
  )
}

export default BookList
