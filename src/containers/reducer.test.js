import reducer from './reducer'
import * as types from './types'

describe('Reducer', () => {
  it('Set the search keyword', () => {
    const initState = { term: '' }
    const action = { type: types.SET_SEARCH_TERM, term: 'domain' }

    const state = reducer(initState, action)

    expect(state.term).toEqual('domain')
  })

  it('Show loading when request is sent', () => {
    const initState = { loading: false }

    const action = { type: types.FETCH_BOOKS_PENDING }
    const state = reducer(initState, action)

    expect(state.loading).toBeTruthy()
  })

  it('Show error when request failed', () => {
    const initialState = {}

    const action = {
      type: types.FETCH_BOOKS_FAILED,
      error: 'Something went wrong'
    }
    const state = reducer(initialState, action)

    expect(state.error).toEqual('Something went wrong')
  })
})
