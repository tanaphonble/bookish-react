import React, { Component } from 'react'

import axios from 'axios'
import BookList from '../components/BookList'

class BookListContainer extends Component {
  state = {
    books: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/books?_sort=id')
      .then((res) => {
        this.setState({
          books: res.data,
          loading: false
        })
      })
      .catch((err) => (err) => {
        this.setState({
          loading: false,
          error: err
        })
      })
  }

  render() {
    return <BookList {...this.state} />
  }
}

export default BookListContainer
