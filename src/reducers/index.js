import { combineReducers } from 'redux'
import hasErrored from './hasErrored'
import isLoading from './isLoading'
import projects from './projects'
import palettes from './palettes'

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  projects,
  palettes
})

export default rootReducer