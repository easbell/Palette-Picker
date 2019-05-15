import { handleDelete } from './handleDelete';
import { isLoading, hasErrored, setProjects, addProject, addPalette } from '../actions';

describe('handleDelete', () => {
  let mockUrl;
  let mockProject;
  let mockDispatch;
  let mockProjects;
  
  beforeEach(() => {
    mockUrl = 'www.someurl.com'
    mockProject = {name: 'my project' }
    mockProjects = [{id: 1, name: 'my project' }, {id: 2, name: 'my new project' }]
    mockDispatch = jest.fn()

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProject)
    }))
  })
  
  it('calls dispatch with isLoading(true)', () => {
    const thunk = handleDelete(mockUrl)
    
    thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })
  
  it('calls fetch', async () => {
    const thunk = handleDelete(mockUrl)

    await thunk(mockDispatch)

    expect(window.fetch).toHaveBeenCalled()
  });

  it('dispatches setProjects action', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProjects)
    }))

    const thunk = handleDelete(mockUrl, setProjects, mockProjects, 2);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setProjects(mockProjects))
  });

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'response.json is not a function'
    }))
    
    const thunk = handleDelete(mockUrl)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('response.json is not a function'))
  });

  it('should dispatch isLoading(false) if the response is ok', async () => {
    const thunk = handleDelete(mockUrl)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  });
})