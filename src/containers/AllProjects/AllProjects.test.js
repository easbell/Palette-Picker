import React from 'react'
import { AllProjects, mapStateToProps } from './AllProjects'
import { shallow } from 'enzyme'

describe('AllProjects', () => {
  let wrapper
  let mockProjects = [{ id: 1, name: 'my project'}, {id: 2, name: 'my other project'}]

  it('should match the snapshot', () => {
    wrapper = shallow(<AllProjects projects={mockProjects} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        projects: ['projects']
      }
      const expectedProps = {
        projects: ['projects']
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expectedProps)
    });
  });
})