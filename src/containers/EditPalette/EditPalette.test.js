import React from 'react'
import { EditPalette, mapStateToProps, mapDispatchToProps } from './EditPalette'
import { shallow } from 'enzyme'
import { setPalettes } from '../../actions'

describe('EditPalette', () => {
  let wrapper
  let mockPalette = {
    id: 1,
    palette_name: 'my palette',
    color_1: 'blue',
    color_2: 'pink',
    color_3: 'yellow',
    color_4: 'green',
    color_5: 'red'
  }

  it('should match the snapshot', () => {
    wrapper = shallow(<EditPalette palette={mockPalette} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('deletePalette', () => {

    it.skip('should dispatch setPalettes with the updated palettes', () => {
      wrapper = shallow(<EditPalette 
        palette={mockPalette} 
        setPalettes={jest.fn()}
        palettes = {[{id: 1}, {id: 2}]}
        />
      )

      wrapper.find('.delete-palette').simulate('click')
      
      expect(wrapper.props.setPalettes).toHaveBeenCalled()
    })
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

  describe('mapDispatchToProps', () => {
    it('calls dispatch with a setPaletts action', () => {
      const mockDispatch = jest.fn()
      const mockPalettes = ['palettes']
      const actionToDispatch = setPalettes(mockPalettes)

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setPalettes(mockPalettes)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})