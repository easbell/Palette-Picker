import React from 'react';
import { shallow } from 'enzyme';
import { EditProject, mapDispatchToProps, mapStateToProps } from './EditProject';
import { handleFetch } from '../../thunks/handleFetch';
import { handleDelete } from '../../thunks/handleDelete';

describe('EditProject', () => {
  let wrapper;
  let mockPalettes;
  let mockEvent;
  let mockFn;

  beforeEach(() => {
    mockPalettes = [{ id: 1, project_id: 1}];
    mockFn = jest.fn();
    wrapper = shallow( 
      <EditProject 
        foundProject={{ name: 'name', id: 1 }}
        projects={[{name: 'name'}, {name: 'other'}]}
        palettes={mockPalettes}
        handleDelete={mockFn}
        handleFetch={mockFn}
        history={[]}/>
    )
    mockEvent = { target: {name: 'projectName', value: 'name' } }
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state upon handleChange', () => {
    wrapper.find('.project-name').simulate('change', mockEvent);
    expect(wrapper.state('projectName')).toBe('name');
  });

  it('should invoke updateProject upon submit', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateProject');
    wrapper.find('.edit-project-card').simulate('submit', {preventDefault: () => {} })
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch handleFetch when updateProject is invoked', async () => {
    await wrapper.instance().updateProject();
    expect(wrapper.instance().props.handleFetch).toHaveBeenCalled();
  });

  it('should dispatch handleDelete when deleteProject is invoked', async () => {
    await wrapper.instance().deleteProject()
    expect(wrapper.instance().props.handleDelete).toHaveBeenCalled();
  });
  
  describe('mapStateToProps', () => {
    it('returns correct props', () => {
      const mockState = {
        projects: ['projects'],
        palettes: ['palettes'],
        other: 'other'
      }
      const expectedProps = {
        projects: ['projects'],
        palettes: ['palettes']
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expectedProps)
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with handleFetch action', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleFetch();
      mappedProps.handleDelete();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
  });
});