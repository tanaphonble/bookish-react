import React from 'react'

function SearchBox({ onChange, term }) {
  return (
    <input
      type="text"
      className="search"
      placeholder="Type to search"
      onChange={onChange}
      value={term}
    />
  )
}

export default SearchBox
