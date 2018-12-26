import React, { Component } from 'react'
import axios from 'axios'
import BookDetail from '../components/BookDetail'

class BookDetailContainer extends Component {
  state = {
    book: {}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    console.log('book id', this.props.match.params.id)
    axios.get(`http://localhost:8080/books/${id}`).then((res) => {
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
