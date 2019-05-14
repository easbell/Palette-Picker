import React from 'react';
import { PaletteForm, mapStateToProps, mapDispatchToProps } from './PaletteForm';
import { handleFetch } from '../thunks/handleFetch';
import { shallow } from 'enzyme';

jest.mock('../thunks/handleFetch');

describe('PaletteForm', () => {
  let wrapper;
  let mockFn;
  let mockProjects;
  let mockColors;

  beforeEach(() => {
    mockFn = jest.fn();
    mockProjects = [{id: 1, name: 'PROJECT'}, {id: 2, name: 'project'}];
    mockColors = {
      color1: {color: 'red'},
      color2: {color: 'red'},
      color3: {color: 'red'},
      color4: {color: 'red'},
      color5: {color: 'red'},
    }

    wrapper = shallow(
      <PaletteForm 
        savePalette={mockFn}
        handleFetch={mockFn}
        projects={mockProjects}
        colors={mockColors}
      />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state upon change in form', () => {
    const mockEvent = { target: { name: 'paletteName', value: 'new palette'} }
    wrapper.find('.name-input').simulate('change', mockEvent);
    expect(wrapper.state('paletteName')).toBe('new palette');
  });

  it('should not invoke addProject if a project name already exist', async () => {
    const addProjectSpy = jest.spyOn(wrapper.instance(), 'addProject')
    wrapper.setState({projectName: 'project'})
    await wrapper.find('form').simulate('submit', {preventDefault: () => {}})
    expect(addProjectSpy).not.toHaveBeenCalled()
  })

  it('should invoke addProject and addPalette when handleSubmit is invoked', async () => {
    const addProjectSpy = jest.spyOn(wrapper.instance(), 'addProject')
    await wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(addProjectSpy).toHaveBeenCalled();
  });

  it('should dispatch handleFetch twice when addProject is invoked', async () => {
    wrapper.setState({ projectName: 'project' });
    await wrapper.instance().addProject();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should dispatch savePalette and handleFetch when addPalette is invoked', async () => {
    await wrapper.instance().addPalette(3);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should update state when newProject is called', () => {
    wrapper.find('.dropdown-item').simulate('click');
    expect(wrapper.state('newProject')).toBe(true);
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