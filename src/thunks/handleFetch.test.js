import { handleFetch } from './handleFetch';
import { isLoading, hasErrored, setProjects, addProject, addPalette } from '../actions';

describe('handleFetch', () => {
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
    const thunk = handleFetch(mockUrl)
    
    thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })
  
  it('calls fetch', async () => {
    const thunk = handleFetch(mockUrl)

    await thunk(mockDispatch)

    expect(window.fetch).toHaveBeenCalled()
  });

  it('dispatches setProject action', async () => {
    const thunk = handleFetch(mockUrl, addProject);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addProject(mockProject))
  });

  it('dispatches setProjects action', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProjects)
    }))

    const thunk = handleFetch(mockUrl, setProjects);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setProjects(mockProjects))
  });

  it('dispatches addPalette action', async () => {
    const mockPalette = {name: 'palette'}
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockPalette)
    }))

    const thunk = handleFetch(mockUrl, addPalette);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addPalette(mockPalette))
  });

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))
    
    const thunk = handleFetch(mockUrl)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  });

  it('should dispatch isLoading(false) if the response is ok', async () => {
    const thunk = handleFetch(mockUrl)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  });
})