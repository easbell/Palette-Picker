import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../components/DisplayProject/DisplayProject.css';
import EditPalette from '../EditPalette/EditPalette';
import { setProjects, setPalettes, editProject } from '../../actions';
import { handleDelete } from '../../thunks/handleDelete';
import { handleFetch } from '../../thunks/handleFetch';
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';

export class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: this.props.foundProject.name
    }
  }

handleChange = (e) => {
  const { name, value } = e.target
  this.setState({ [name]: value })
}

handleSubmit = async (e) => {
  e.preventDefault();
  const newName = this.state.projectName
  const projectNames = this.props.projects.map(project => project.name)
  if (projectNames.includes(newName)) {
    cogoToast.warn(`${newName} already exists. Please choose another name for your project`, {position: 'bottom-left'})
  } else {
    await this.updateProject(this.props.foundProject.id)
  }
}

updateProject = async (id) => {
  this.props.history.push('/my-projects')
  const name = this.state.projectName.toUpperCase()
  const projectUrl = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}/`
  const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects'
  const optionsObject = {
    method: 'PUT',
    body: JSON.stringify({
      name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  await this.props.handleFetch(projectUrl, editProject, optionsObject)
  this.props.handleFetch(url, setProjects)
  cogoToast.success('Project name was updated', {position: 'bottom-left'})
}

renderPalettes = () => {
  const { id } = this.props.foundProject
  return this.props.palettes.filter(palette => palette.project_id === id).map(palette => <EditPalette key={palette.id} palette={palette}/>)
}

deleteProject = async (id) => {
  this.props.history.push('/my-projects')
  const updatedProjects = this.props.projects.filter(project => project.id !== id )
  const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}`
  await this.props.handleDelete(url, setProjects, updatedProjects, id)
  cogoToast.success('Project was deleted.', {position: 'bottom-left'});
  const allPalettes = process.env.REACT_APP_BACKEND_URL + 'api/v1/palettes';
  this.props.handleFetch(allPalettes, setPalettes)
}

render() {
  return (
    <form className='project-card edit-project-card' onSubmit={this.handleSubmit}>
      <input 
        className='project-name' 
        name='projectName'
        value={this.state.projectName}
        onChange={this.handleChange}
      />
      {this.renderPalettes()}
      <div className='delete-btn-container'>
        <button className='delete-project' type='submit'>
          Save
        </button>
        <button className='delete-project' onClick={() => this.deleteProject(this.props.foundProject.id)}>
          Delete Project
        </button>
      </div>
    </form>
  )
}
}

export const mapStateToProps = (state) => ({
  palettes: state.palettes,
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  handleDelete: (url, action, items, id) => dispatch(handleDelete(url, action, items, id)),
  handleFetch: (url, action, options) => dispatch(handleFetch(url, action, options))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProject))