import { isLoading, hasErrored } from '../actions'

export const handleDelete = (url, action, projects, id) => {
  return async (dispatch) => {
    dispatch(isLoading(true))
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({id: id}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      dispatch(isLoading(false))
      dispatch(action(projects))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}