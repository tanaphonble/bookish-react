import React from 'react'
import { shallow } from 'enzyme'
import BookDetail from '.'

it('Shows book name', () => {
  const props = {
    book: {
      name: 'Refactoring',
      Description: 'The book about how to do refactoring'
    }
  }
  const wrapper = shallow(<BookDetail {...props} />)
  expect(wrapper.find('.name').text()).toEqual('Refactoring')
})
