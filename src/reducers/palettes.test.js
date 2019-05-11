import palettes from './palettes'
import * as actions from '../actions'

describe('palettes', () => {
  it('should return the initial state by default', () => {
    const expected = []
    const result = palettes(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should add a new palette if the type is ADD_PALETTE', () => {
    const mockPalette = { palette_name: 'my new palette', color_1: '#123456'}
    const mockAction = actions.addPalette(mockPalette)
    const result = palettes(undefined, mockAction)
    expect(result).toEqual([mockPalette])
  })
})