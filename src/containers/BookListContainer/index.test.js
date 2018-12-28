import React from 'react'
import { BookListContainer } from '.'
import { shallow } from 'enzyme'

describe('BookListContainer', () => {
  it('render', () => {
    const props = {
      loading: false,
      books: [],
      fetchBooks: jest.fn()
    }

    const wrapper = shallow(<BookListContainer {...props} />)
    expect(wrapper.find('SearchBox').length).toEqual(1)
    expect(wrapper.find('BookList').length).toEqual(1)
  })

  it('invoke correct actions', () => {
    const props = {
      loading: false,
      books: [],
      fetchBooks: jest.fn(),
      setSearchTerm: jest.fn()
    }

    const wrapper = shallow(<BookListContainer {...props} />)

    wrapper
      .find('SearchBox')
      .simulate('change', { target: { value: 'domain' } })
    expect(props.setSearchTerm).toHaveBeenCalledWith('domain')
    expect(props.fetchBooks).toHaveBeenCalled()
  })

  // it('Fetch book by id', () => {
  //   const book = { id: 1, name: 'Refactoring' }
  //   axios.get = jest
  //     .fn()
  //     .mockImplementation(() => Promise.resolve({ data: book }))

  //   const store = mockStore({ list: { books: [], term: '' } })

  //   return store.dispatch(fetchABooks(1)).then(() => {
  //     expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books/1')
  //   })
  // })
})
