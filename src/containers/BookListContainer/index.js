import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BookList from '../../components/BookList'
import SearchBox from '../../components/SearchBox'
import { fetchBooks, setSearchTerm } from '../actions'

export class BookListContainer extends Component {
  state = {
    books: [],
    loading: true,
    error: null,
    term: ''
  }

  componentDidMount() {
    this.props.fetchBooks()
  }

  filterBook = (e) => {
    this.props.setSearchTerm(e.target.value)
    this.props.fetchBooks()
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

const mapStateToProps = (state) => ({
  loading: state.list.loading,
  books: state.list.books,
  error: state.list.error,
  term: state.list.term
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSearchTerm,
      fetchBooks
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookListContainer)
