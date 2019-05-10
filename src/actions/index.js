export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
});

export const hasErrored = (message) => ({
  type: 'HAS_ERRORED',
  message
});

export const setProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects
});

export const addProject = (project) => ({
  type: 'ADD_PROJECT',
  project
});