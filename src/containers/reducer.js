import * as types from './types'

const initialState = {
  term: '',
  books: [],
  current: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term
      }
    case types.FETCH_BOOKS_PENDING:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload
      }
    case types.FETCH_BOOKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case types.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload
      }
    default:
      return state
  }
}
