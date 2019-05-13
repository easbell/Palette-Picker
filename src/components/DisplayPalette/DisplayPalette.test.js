import React from 'react'
import { DisplayPalette } from './DisplayPalette'
import { shallow } from 'enzyme'
// Enzyme.configure({ adapter: new Adapter() })

describe('DisplayPalette', () => {
  let wrapper
  let mockPalette = {
    id: 4,
    palette_name: 'my palette',
    color_1: 'blue',
    color_2: 'pink',
    color_3: 'yellow',
    color_4: 'green',
    color_5: 'red',
    project_id: 7
  }

  it('should match the snapshot', () => {
    wrapper = shallow(<DisplayPalette {...mockPalette} />)
    expect(wrapper).toMatchSnapshot()
  })
})