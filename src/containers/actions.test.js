import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import * as actions from './actions'
import * as types from './types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {
  it('Fetch data successfully', () => {
    const books = [
      {
        id: 1,
        name: 'Refactoring'
      },
      {
        id: 2,
        name: 'Domain-driven design'
      }
    ]
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))

    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, payload: books }
    ]
    const store = mockStore({ list: { books: [] } })

    return store.dispatch(actions.fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('Fetch data with error', () => {
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ message: 'Something went wrong' })
      )

    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_FAILED, error: 'Something went wrong' }
    ]
    const store = mockStore({ list: { books: [], term: '' } })

    return store.dispatch(actions.fetchBooks()).then(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/books?_sort=id&q=`
      )
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('Search data with term in state', () => {
    const books = [
      {
        id: 1,
        name: 'Refactoring'
      },
      {
        id: 2,
        name: 'Domain-driven design'
      }
    ]
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))

    const store = mockStore({ list: { books: [], term: 'domain' } })

    return store.dispatch(actions.fetchBooks()).then(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/books?_sort=id&q=domain'
      )
    })
  })

  it('Save a review for a book', () => {
    const review = {
      name: 'Ble',
      content: 'Good book'
    }
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({}))

    const store = mockStore({ list: { books: [], term: '' } })

    store.dispatch(actions.saveReview(1, review)).then(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/books/1/reviews',
        JSON.stringify(review),
        { headers: { 'Content-Type': 'application/json' } }
      )
    })
  })

  it('Update a review for a book', () => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    const review = {
      name: 'Ble',
      content: 'Good book'
    }

    axios.put = jest.fn().mockImplementation(() => Promise.resolve({}))

    const store = mockStore({ list: { books: [], term: '' } })

    return store.dispatch(actions.updateReview(1, review)).then(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:8080/reviews/1',
        JSON.stringify(review),
        config
      )
    })
  })
})
