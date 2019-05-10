import { combineReducers } from 'redux'
import hasErrored from './hasErrored'
import isLoading from './isLoading'
import projectsReducer from './projectsReducer'

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  projectsReducer
})

export default rootReducer