import rootReducer from './index'
import { createStore } from 'redux'
import projects from './projects'

describe('rootReducer', () => {
  it('should return a store', () => {
    const store = createStore(rootReducer)
    expect(store.getState().projects).toEqual(projects(undefined, {}))
  })
})