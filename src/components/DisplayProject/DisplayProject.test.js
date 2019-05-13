import React from 'react'
import { DisplayProject, mapStateToProps } from './DisplayProject'
import { shallow } from 'enzyme'

describe('DisplayProject', () => {
  let wrapper
  let mockProps = {
    palettes: [{ id: 1, project_id: 1 }, { id: 2, project_id: 3 }],
    project: { id: 1, name: 'my project'}
  }

  it('should match the snapshot', () => {
    wrapper = shallow(<DisplayProject {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        palettes: ['palettes']
      }
      const expectedProps = {
        palettes: ['palettes']
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expectedProps)
    });
  });
})