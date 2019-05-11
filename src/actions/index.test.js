// it('shoud have a type of STORE_INTRO', () => {
//   const intro = 'introduction'
//   const expectedAction = {
//     type: 'STORE_INTRO',
//     intro
//   }
//   const result = actions.storeIntro(intro)
//   expect(result).toEqual(expectedAction)
// })


import * as actions from '../actions'

describe('actions', () => {
  it('should have a type of IS_LOADING', () => {
    const isLoading = true
    const expectedAction = {
      type: 'IS_LOADING',
      isLoading
    }

    const result = actions.isLoading(isLoading)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of HAS_ERRORED', () => {
    const message = 'Something went wrong'
    const expectedAction = {
      type: 'HAS_ERRORED',
      message
    }

    const result = actions.hasErrored(message)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of SET_PROJECTS', () => {
    const projects = [ { name: 'my project' }, { name: 'another project'} ]
    const expectedAction = {
    type: 'SET_PROJECTS',
    projects
    }

    const result = actions.setProjects(projects)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of ADD_PROJECT', () => {
    const project = { name: 'new project' }
    const expectedAction = {
      type: 'ADD_PROJECT',
      project
    }
    
    const result = actions.addProject(project)
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of ADD_PALETTE', () => {
    const palette = { palette_name: 'new palette', color_1: '#123456' }
    const expectedAction = {
      type: 'ADD_PALETTE',
      palette
    }

    const result = actions.addPalette(palette)
    expect(result).toEqual(expectedAction)
  })
})