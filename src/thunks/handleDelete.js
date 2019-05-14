import { isLoading, hasErrored } from '../actions'

export const handleDelete = (url, action, items, id) => {
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
      const msg = await response.json()
      console.log(msg)
      dispatch(isLoading(false))
      dispatch(action(items))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}