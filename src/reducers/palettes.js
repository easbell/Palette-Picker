const palettes = (state=[], action) => {
  switch(action.type) {
    case 'ADD_PALETTE':
      return [...state, action.palette]
    default: 
      return state
  }
}

export default palettes