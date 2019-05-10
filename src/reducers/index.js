import { combineReducers } from 'redux'
import hasErrored from './hasErrored'
import isLoading from './isLoading'
import projectsReducer from './projectsReducer'
import palettes from './palettes'

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  projectsReducer,
  palettes
})

export default rootReducer