import { isLoading, hasErrored } from '../actions'

export const handleFetch = (url, action, options) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, options)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      dispatch(isLoading(false))
      dispatch(action(data))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}

