import React from 'react'
import { connect } from 'react-redux'
import '../../components/DisplayProject/DisplayProject.css'
import EditPalette from '../EditPalette/EditPalette'
import { setProjects, setPalettes } from '../../actions'
import { handleDelete } from '../../thunks/handleDelete'
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
    const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}`
    props.handleDelete(url, setProjects, updatedProjects, id)
    deleteLinkedPalettes(id)
  }

  const deleteLinkedPalettes = (id) => {
    const unlinkedPalettes = props.palettes.filter(palette => {
      return palette.id !== id
    })
    
    props.palettes.filter(palette => {
      return palette.project_id === id
    }).forEach(palette => {
      const url = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${palette.id}`
      console.log(url)
      props.handleDelete(url, setPalettes, unlinkedPalettes, id)
    })
     
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

export const mapStateToProps = (state) => ({
  palettes: state.palettes,
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  handleDelete: (url, action, items, id) => dispatch(handleDelete(url, action, items, id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProject))