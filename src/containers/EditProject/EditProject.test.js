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
        handleFetch={mockFn}/>
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

  it.skip('should invoke updateProject upon submit', () => {
    mockEvent = { target: {name: 'projectName', value: 'NEW', preventDefault: () => {} }}
    wrapper.find('.edit-project-card').simulate('submit', mockEvent);
    const spy = jest.spyOn(wrapper.instance(), 'updateProject');
    expect(spy).toHaveBeenCalled();
  });

  it.skip('should invoke updateProject when handleSubmit is invoked', () => {
    wrapper.setState({ projectName: 'name'});
    wrapper.find('.edit-project-card').simulate('submit', { preventDefault: () => {}});

    const spy = jest.spyOn(wrapper.instance(), 'updateProject');
    expect(spy).toHaveBeenCalled();
  });

  it.skip('should invoke renderPalettes upon component mounting', () => {
    wrapper.instance()
    const spy = jest.spyOn(wrapper.instance(), 'renderPalettes');
    expect(spy).toHaveBeenCalled();
  });

  it.skip('should dispatch handleDelete when deleteProject is invoked', async () => {
    wrapper.instance().deleteProject(wrapper.instance().props.foundProject.id)
    // await wrapper.find('.delete').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(2);
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
      // const actionToDispatch = handleFetch();
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleFetch();
      mappedProps.handleDelete();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
  });
});