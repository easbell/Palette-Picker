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

  it.skip('should set state with updated colors when setColors is called', () => {
    // wrapper.instance().componentDidMount();
    expect(wrapper.instance().setState).toHaveBeenCalled();
  });

  it('should set state when save palette is called', () => {
    wrapper.find('.save').simulate('click', true);
    expect(wrapper.state('showForm')).toBe(true);
  });
});
