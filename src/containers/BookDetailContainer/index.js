import React, { Component } from 'react'
import axios from 'axios'
import BookDetail from '../../components/BookDetail'

class BookDetailContainer extends Component {
  state = {
    book: {}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios
      .get(`${process.env.REACT_APP_API_URL_BASE}/books/${id}`)
      .then((res) => {
        this.setState({
          book: res.data
        })
      })
  }

  render() {
    return <BookDetail {...this.state} />
  }
}

export default BookDetailContainer
