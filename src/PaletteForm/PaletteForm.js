import React, { Component } from 'react';
import { addProject, setProjects } from '../actions';
import { connect } from 'react-redux';
import { handleFetch } from '../thunks/handleFetch';

export class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      paletteName: '',
      palette: [],
      projectName: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
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

export const mapDispatchToProps = (dispatch) => ({
  handleFetch: (url, action, options) => dispatch(handleFetch(url, action, options))
})

export default connect(null, mapDispatchToProps)(PaletteForm)
