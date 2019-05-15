import projects from './projects'
import * as actions from '../actions'

describe('projects', () => {
  it('should return state by default', () => {
    const expected = []
    const result = projects(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return all of the projects from the backend if the type is SET_PROJECTS', () => {
    const mockProjects = [{ name: 'my project' }, { name: 'my other project' }]
    const mockAction = actions.setProjects(mockProjects)
    const result = projects(undefined, mockAction)
    expect(result).toEqual(mockProjects)
  })

  it('should return all of the projects, including the newly added project, if the type is ADD_PROJECT', () => {
    const mockState = [{ name: 'my project' }, { name: 'my other project' }]
    const mockNewProject = { name: 'my new project' }
    const mockAction = actions.addProject(mockNewProject)
    const expected = [{ name: 'my project' }, { name: 'my other project' }, { name: 'my new project' }]
    const result = projects(mockState, mockAction)
    expect(result).toEqual(expected)
  })

  it('should return all of the projects, including the newly added project, if the type is EDIT_PROJECT', () => {
    const mockState = [{ name: 'my project' }, { name: 'my other project' }]
    const mockNewProject = { name: 'my new project' }
    const mockAction = actions.editProject(mockNewProject)
    const expected = [{ name: 'my project' }, { name: 'my other project' }, { name: 'my new project' }]
    const result = projects(mockState, mockAction)
    expect(result).toEqual(expected)
  })
})