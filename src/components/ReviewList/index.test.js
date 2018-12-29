import React from 'react'
import { shallow } from 'enzyme'
import ReviewList from '.'

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
          name: 'Test Driven Development',
          date: '2018/12/28',
          content: 'What a good book'
        },
        { name: 'Javascript', date: '2018/12/28', content: 'Good book' }
      ]
    }

    const wrapper = shallow(<ReviewList {...props} />)
    expect(wrapper.find('.reviews-container').length).toBe(1)
    expect(wrapper.find('.review').length).toBe(2)

    const firstReview = wrapper.find('.review').at(0)
    expect(firstReview.text()).toEqual('What a good book')
  })
})
