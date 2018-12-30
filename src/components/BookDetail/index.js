import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './index.css'
import ReviewList from '../ReviewList'

class BookDetail extends Component {
  state = {
    name: '',
    content: ''
  }

  updateName = (e) => {
    this.setState({ name: e.target.value })
  }

  updateContent = (e) => {
    this.setState({ content: e.target.value })
  }

  saveReview = (e) => {
    console.log('this.props:', this.props)
    e.preventDefault()
    const id = this.props.book.id
    this.props.saveReview(id, {
      name: this.state.name,
      content: this.state.content
    })
  }

  renderReviewList = () => {
    const { book } = this.props
    if (book.reviews) {
      return <ReviewList reviews={book.reviews} />
    }
  }

  renderReviewForm = () => {
    return (
      <form>
        <input
          type="text"
          name="name"
          onChange={this.updateName}
          value={this.state.name}
        />
        <textarea
          name="content"
          cols="30"
          rows="10"
          onChange={this.updateContent}
          value={this.state.content}
        />
        <button name="submit" onClick={this.saveReview}>
          Submit
        </button>
      </form>
    )
  }

  render() {
    const { book } = this.props
    return (
      <div className="datail">
        <div className="name">{book.name}</div>
        <div className="description">{book.description || book.name}</div>
        {this.renderReviewForm()}
        {this.renderReviewList()}
      </div>
    )
  }
}

BookDetail.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        content: PropTypes.string
      })
    )
  })
}

export default BookDetail
