const palettes = (state=[], action) => {
  switch(action.type) {
    case 'SET_PALETTES':
      return action.palettes
    case 'ADD_PALETTE':
      return [...state, action.palette]
    case 'EDIT_PALETTE':
      return [...state, action.palette]
    default: 
      return state
  }
}

export default palettes