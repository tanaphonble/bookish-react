import React, { Component } from 'react'

import axios from 'axios'
import BookList from '../../components/BookList'
import SearchBox from '../../components/SearchBox'

class BookListContainer extends Component {
  state = {
    books: [],
    loading: true,
    error: null,
    term: ''
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks() {
    const { term } = this.state
    axios
      .get(`${process.env.REACT_APP_API_URL_BASE}/books?_sort=id&q=${term}`)
      .then(this.updateBook)
      .catch(this.updateError)
  }

  filterBook = (e) => {
    this.setState(
      {
        term: e.target.value
      },
      this.fetchBooks
    )
  }

  updateBook = (res) => {
    this.setState({
      books: res.data,
      loading: false
    })
  }

  updateError = (err) => {
    this.setState({
      loading: false,
      error: err
    })
  }

  render() {
    return (
      <div>
        <SearchBox onChange={this.filterBook} term={this.state.term} />
        <BookList {...this.state} />
      </div>
    )
  }
}

export default BookListContainer
