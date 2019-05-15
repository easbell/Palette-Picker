import React from 'react';
import { Palette } from './Palette';
import { shallow } from 'enzyme';

describe('Palette', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Palette />)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should update state when lockColor is called', () => {
    wrapper.setState({
      color1: {color: '#ffffff', locked: false},
      color2: {color: '', locked: false},
      color3: {color: '', locked: false},
      color4: {color: '', locked: false},
      color5: {color: '', locked: false},
      showForm: false
    })
    wrapper.instance().lockColor('#ffffff');
    expect(wrapper.state('color1')).toEqual({color: '#ffffff', locked: true})
  });

  it('should set state when savePalette is called', () => {
    wrapper.find('.save').simulate('click', true);
    expect(wrapper.state('showForm')).toBe(true);
  });

});
