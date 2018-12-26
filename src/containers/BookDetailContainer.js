import React, { Component } from 'react'
import axios from 'axios'

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
    const { book } = this.state
    console.log('book', book)
    return (
      <div className="datail">
        <div className="description">{book.description}</div>
      </div>
    )
  }
}

export default BookDetailContainer
