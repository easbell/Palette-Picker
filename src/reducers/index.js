import { combineReducers } from 'redux'
import hasErrored from './hasErrored'
import isLoading from './isLoading'
import setProjects from './setProjects'

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  setProjects
})

export default rootReducer