const palettes = (state=[], action) => {
  switch(action.type) {
    case 'ADD_PALETTE':
      return [...state, action.project]
    default: 
      return state
  }
}

export default palettes