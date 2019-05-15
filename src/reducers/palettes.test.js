import palettes from './palettes'
import * as actions from '../actions'

describe('palettes', () => {
  it('should return the initial state by default', () => {
    const expected = []
    const result = palettes(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set state with the passed palettes if the type is SET_PALETTES', () => {
    const initialState = []
    const mockPalettes = [ { palette_name: 'palette one'}, { palette_name: 'palette two'} ]
    const mockAction = actions.setPalettes(mockPalettes)
    const result = palettes(initialState, mockAction)
    expect(result).toEqual(mockPalettes)
  })

  it('should add a new palette if the type is ADD_PALETTE', () => {
    const initialState = [ { palette_name: 'old palette' } ]
    const mockPalette = { palette_name: 'my new palette' }
    const mockAction = actions.addPalette(mockPalette)
    const expected = [ { palette_name: 'old palette' }, { palette_name: 'my new palette' }]
    const result = palettes(initialState, mockAction)
    expect(result).toEqual(expected)
  })

  it('should add a new palette if the type is EDIT_PALETTE', () => {
    const initialState = [ { palette_name: 'old palette' } ]
    const mockPalette = { palette_name: 'my new palette' }
    const mockAction = actions.editPalette(mockPalette)
    const expected = [ { palette_name: 'old palette' }, { palette_name: 'my new palette' }]
    const result = palettes(initialState, mockAction)
    expect(result).toEqual(expected)
  })
})