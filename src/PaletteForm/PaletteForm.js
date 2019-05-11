import React, { Component } from 'react';
import { addProject, setProjects, addPalette } from '../actions';
import { connect } from 'react-redux';
import { handleFetch } from '../thunks/handleFetch';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      paletteName: '',
      projectName: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.addProject()
    this.addPalette()
  }

  addProject = async () => {
    const { projectName } = this.state;
    const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects/'
    const optionsObject = {
      method: 'POST',
      body: JSON.stringify({name: projectName}),
      headers: { 
        'Content-Type': 'application/json'
      }
    }
    await this.props.handleFetch(url, addProject, optionsObject);
    await this.props.handleFetch(url, setProjects);
  }

  addPalette = async () => {
    const { paletteName } = this.state
    const { projects, colors } = this.props
    const id = projects[projects.length -1].id
    const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}/palettes/`
    const optionsObject = {
      method: 'POST',
      body: JSON.stringify({
        palette_name: paletteName,
        color_1: colors[0],
        color_2: colors[1],
        color_3: colors[2],
        color_4: colors[3],
        color_5: colors[4]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await this.props.handleFetch(url, addPalette, optionsObject)
  }

  showProjects = () => {
    const { projects } = this.props;
    return projects.map(project => {
      return <Dropdown.Item key={project.id}>{project.name}</Dropdown.Item>
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Save Palette</h2>
        <input 
          placeholder='Name this palette'
          name='paletteName'
          value={this.state.paletteName}
          onChange={this.handleChange}
        />
        <DropdownButton id="dropdown-basic-button" title="Saved Projects">
          {this.showProjects()}
        </DropdownButton>
        <input 
          placeholder='Name this project' 
          name='projectName'
          value={this.state.projectName}
          onChange={this.handleChange}
        />
        <button type='submit'>Save palette & project</button>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projectsReducer
})

export const mapDispatchToProps = (dispatch) => ({
  handleFetch: (url, action, options) => dispatch(handleFetch(url, action, options))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaletteForm)
