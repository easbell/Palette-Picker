import React from 'react';
import { Color } from './Color';
import { shallow } from 'enzyme';

describe('Color', () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();

    wrapper = shallow(
      <Color 
        lockColor={mockFn} 
        color={'#ffffff'} 
        savePalette={mockFn}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state and call lockColor when color is clicked', () => {
    wrapper.find('.color').simulate('click');
    expect(wrapper.state('locked')).toBe(true);
    expect(mockFn).toHaveBeenCalled();
  });
});