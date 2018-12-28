import axios from 'axios'
import * as types from './types'

export const fetchBooks = () => {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOKS_PENDING })
    const state = getState()
    return axios
      .get(`http://localhost:8080/books?q=${state.list.term}`)
      .then((res) => {
        dispatch({ type: types.FETCH_BOOKS_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: types.FETCH_BOOKS_FAILED, error: err.message })
      })
  }
}

export const setSearchTerm = (term) => ({
  type: types.SET_SEARCH_TERM,
  term
})

export const fetchABook = (id) => {
  return (dispatch) => {
    dispatch({ type: types.FETCH_BOOK_PENDING })
    return axios
      .get(`http://localhost:8080/books/${id}`)
      .then((res) => {
        dispatch({ type: types.FETCH_BOOK_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: types.FETCH_BOOK_FAILED, error: err.message })
      })
  }
}
