import { isLoading, setProjects, hasErrored } from '../actions'

export const fetchProjects = () => {
  const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects';
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      const projects = await response.json()
      dispatch(isLoading(false))
      dispatch(setProjects(projects))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}