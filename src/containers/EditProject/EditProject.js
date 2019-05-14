import React from 'react';
import { connect } from 'react-redux';
import '../../components/DisplayProject/DisplayProject.css';
import EditPalette from '../EditPalette/EditPalette';
import { setProjects, setPalettes } from '../../actions';
import { handleDelete } from '../../thunks/handleDelete';
import { handleFetch } from '../../thunks/handleFetch';
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';

export const EditProject = (props) => {
  const renderPalettes = () => {
    const { id } = props.foundProject
    return props.palettes.filter(palette => palette.project_id === id).map(palette => <EditPalette key={palette.id} palette={palette}/>)
  }

  const deleteProject = async (id) => {
    props.history.push('/my-projects')
    const updatedProjects = props.projects.filter(project => project.id !== id )
    const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}`
    await props.handleDelete(url, setProjects, updatedProjects, id)
    cogoToast.success('Project was deleted.', {position: 'bottom-left'});
    const allPalettes = process.env.REACT_APP_BACKEND_URL + 'api/v1/palettes';
    props.handleFetch(allPalettes, setPalettes)
  }

  return (
    <div className='project-card edit-project-card'>
      <h2 className='project-name'>{props.foundProject.name}</h2>
      {renderPalettes()}
      <div className='delete-btn-container'>
        <button className='delete-project' onClick={() => deleteProject(props.foundProject.id)}>Delete Project</button>
      </div>
    </div>
  )
}

export const mapStateToProps = (state) => ({
  palettes: state.palettes,
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  handleDelete: (url, action, items, id) => dispatch(handleDelete(url, action, items, id)),
  handleFetch: (url, action) => dispatch(handleFetch(url, action))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProject))