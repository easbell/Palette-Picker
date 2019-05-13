import React from 'react'
import { connect } from 'react-redux'
import '../../components/DisplayProject/DisplayProject.css'
import EditPalette from '../EditPalette/EditPalette'
import { setProjects, setPalettes } from '../../actions'
import { deleteFromBE } from '../../helpers/apiCalls'
import { withRouter } from 'react-router-dom'

export const EditProject = (props) => {
  const { name, id } = props.foundProject
  const palettes = props.palettes.filter(palette => {
    return palette.project_id === id
  }).map(palette => {
      return <EditPalette key={palette.id} palette={palette}/>
    })

  const deleteProject = (id) => {
    const updatedProjects = props.projects.filter(project => {
      return project.id !== id
    })
    props.setProjects(updatedProjects)
    const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}`
    deleteFromBE(url, id)
    deleteLinkedPalettes(id)
  }

  const deleteLinkedPalettes = (id) => {
    props.palettes.filter(palette => {
      return palette.project_id === id
    }).forEach(palette => {
      const url = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${palette.id}`
      deleteFromBE(url, palette.id)
    })
    const unlinkedPalettes = props.palettes.filter(palette => {
      return palette.project_id !== id
    })
    setPalettes(unlinkedPalettes)
    props.history.push('/my-projects')
  }

  return (
    <div className='project-card edit-project-card'>
      <h2 className='project-name'>{name}</h2>
      {palettes}
      <div className='delete-btn-container'>
        <button className='delete-project' onClick={() => deleteProject(id)}>Delete Project</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  palettes: state.palettes,
  projects: state.projects
})

const mapDispatchToProps = (dispatch) => ({
  setProjects: (projects) => dispatch(setProjects(projects)),
  setPalettes: (palettes) => dispatch(setPalettes(palettes))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProject))