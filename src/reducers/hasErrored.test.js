import { hasErrored } from './hasErrored'
import * as actions from '../actions'

describe('hasErrored', () => {
  it('should return an empty string by default', () => {
    let expected = ''
    let result = hasErrored(undefined, {})
    expect(result).toEqual(expected)
  })
})