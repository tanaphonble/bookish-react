import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateReview } from '../../../containers/actions'

export class Review extends Component {
  state = {
    edit: false,
    content: ''
  }

  edit = () => {
    this.setState({
      content: this.props.review.content,
      edit: true
    })
  }

  submit = () => {
    this.setState({
      edit: false
    })
    const { id, bookId, name, date } = this.props.review
    const content = this.state.content
    this.props.updateReview(id, {
      bookId,
      name,
      date,
      content
    })
  }

  updateContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  render() {
    const {
      review: { name, date, content }
    } = this.props
    return (
      <div className="review">
        <div>
          <span className="name">{name}</span>
          <span className="date">{date}</span>
        </div>
        {this.state.edit ? (
          <textarea
            value={content}
            cols="30"
            rows="10"
            className="review-content"
            onChange={this.updateContent}
          />
        ) : (
          <p>{content}</p>
        )}
        {this.state.edit ? (
          <button className="submit" onClick={this.submit} />
        ) : (
          <button className="edit" onClick={this.edit} />
        )}
      </div>
    )
  }
}

export default connect(
  null,
  { updateReview }
)(Review)
