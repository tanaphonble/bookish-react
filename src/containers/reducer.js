import * as types from './types'

const initialState = {
  term: ''
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
    default:
      return state
  }
}
