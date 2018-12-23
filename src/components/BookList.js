import React from 'react'

function BookList({ books }) {
  return (
    <div className="books">
      {books.map((book, index) => (
        <div key={`${book.name}_${index}`} className="book">
          <h2 className="title">{book.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default BookList
