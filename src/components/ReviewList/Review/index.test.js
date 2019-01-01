import React from 'react'
import { shallow } from 'enzyme'
import { Review } from '.'

describe('Review', () => {
  it('Render Review', () => {
    const props = {
      review: {
        name: 'Ble',
        date: '2018/12/30',
        content: 'Good book'
      }
    }

    const wrapper = shallow(<Review {...props} />)
    const firstReview = wrapper.find('.review p').at(0)
    expect(firstReview.text()).toEqual('Good book')

    const name = wrapper.find('.review .name').at(0)
    expect(name.text()).toEqual('Ble')

    const date = wrapper.find('.review .date').at(0)
    expect(date.text()).toEqual('2018/12/30')
  })

  it('Editing', () => {
    const props = {
      review: {
        name: 'Ble',
        date: '2018/12/30',
        content: 'Good book'
      }
    }

    const wrapper = shallow(<Review {...props} />)

    expect(wrapper.find('button.submit').length).toEqual(0)
    expect(wrapper.find('button.edit').length).toEqual(1)
    expect(wrapper.find('.review p').text()).toEqual('Good book')

    wrapper.find('button.edit').simulate('click')

    expect(wrapper.find('button.submit').length).toEqual(1)
    expect(wrapper.find('button.edit').length).toEqual(0)
    expect(wrapper.find('.review textarea').props().value).toEqual('Good book')
  })

  it('Submit the updates', () => {
    const props = {
      review: {
        name: 'Ble',
        date: '2018/12/30',
        content: 'Good book'
      },
      updateReview: jest.fn()
    }

    const wrapper = shallow(<Review {...props} />)

    wrapper.find('button.edit').simulate('click')
    expect(wrapper.find('.review textarea').props().value).toEqual('Good book')

    wrapper.find('button.submit').simulate('click')
    expect(props.updateReview).toHaveBeenCalled()
  })
})
