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
      .get(`${process.env.REACT_APP_API_URL_BASE}/books?_sort=id`)
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
