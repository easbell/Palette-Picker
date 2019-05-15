import React from 'react'
import { EditPalette, mapStateToProps, mapDispatchToProps } from './EditPalette'
import { shallow } from 'enzyme'

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

  let mockPalettes = [{id: 1}, {id: 2}]

  let mockProps = {
    palette: mockPalette,
    palettes: mockPalettes,
    handleDelete: jest.fn(),
    handleFetch: jest.fn()
  }
  
  beforeEach(() => {
    wrapper = shallow(<EditPalette {...mockProps} />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should update state on change of palette name', () => {
    const mockEvent = { target: { name: 'paletteName', value: 'change'} }
    wrapper.find('.palette-name').simulate('change', mockEvent);
    expect(wrapper.state('paletteName')).toBe('change');
  });

  it('should call handleFetch on blur', async () => {
    await wrapper.instance().handleBlur()
    expect(wrapper.instance().props.handleFetch).toHaveBeenCalled();
  });

  it('should call deletePalette when delete-palette is clicked', () => {
    const deletePaletteSpy = jest.spyOn(wrapper.instance(), 'deletePalette')
    wrapper.find('.delete-palette').simulate('click')
    expect(deletePaletteSpy).toHaveBeenCalled()
  })

  it('should call handleDelete when deletePalette is called', () => {
    wrapper.instance().deletePalette()
    expect(wrapper.instance().props.handleDelete).toHaveBeenCalled()
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
    it('calls dispatch with handleFetch and handleDelete action', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleFetch();
      mappedProps.handleDelete();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
  })
})