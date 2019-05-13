import React from 'react'
import { DisplayPalette } from './DisplayPalette'
import { shallow } from 'enzyme'

describe('DisplayPalette', () => {
  let wrapper
  let mockPalette = {
    palette_name: 'my palette',
    color_1: 'blue',
    color_2: 'pink',
    color_3: 'yellow',
    color_4: 'green',
    color_5: 'red'
  }

  it('should match the snapshot', () => {
    wrapper = shallow(<DisplayPalette palette={mockPalette} />)
    expect(wrapper).toMatchSnapshot()
  })
})