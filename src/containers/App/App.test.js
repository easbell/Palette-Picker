import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { handleFetch } from '../../thunks/handleFetch';

jest.mock('../../thunks/handleFetch');

describe('App', () => {
  let wrapper;
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn()
    wrapper = shallow(<App handleFetch={mockFn}/>)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleFetch twice upon componentDidMount', () => {
    wrapper = shallow(<App handleFetch={mockFn}/>)
    wrapper.instance().componentDidMount();

    expect(mockFn).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        projects: ['projects'],
        other: 'other'
      }
      const expectedProps = {
        projects: ['projects']
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expectedProps)
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with handleFetch action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = handleFetch();
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleFetch();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});