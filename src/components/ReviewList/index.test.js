import React from 'react'
import { shallow } from 'enzyme'
import ReviewList from '.'
import Review from './Review'

describe('ReviewList', () => {
  it('Empty list', () => {
    const props = {
      reviews: []
    }
    const wrapper = shallow(<ReviewList {...props} />)
    expect(wrapper.find('.reviews-container').length).toEqual(1)
  })

  it('Render List', () => {
    const props = {
      reviews: [
        {
          id: 1,
          name: 'Ble',
          date: '2018/12/28',
          content: 'What a good book'
        },
        {
          id: 2,
          name: 'Javascript',
          date: '2018/12/28',
          content: 'Good book'
        }
      ]
    }

    const wrapper = shallow(<ReviewList {...props} />)
    expect(wrapper.find(Review).length).toBe(2)
  })
})
