const setProjects = (state=[], action) => {
  switch(action.type) {
    case 'SET_PROJECTS': 
      return [...state, ...action.projects ]
    default:
      return state
  }
}

export default setProjects