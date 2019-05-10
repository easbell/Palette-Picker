import React, { Component } from 'react'

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
    const { projectName } = this.state; 
    e.preventDefault();
    const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects/'
    const optionsObject = {
      method: 'POST',
      body: JSON.stringify({name: projectName}),
      headers: { 
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, optionsObject);
    const data = await response;
    console.log(data)
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

export default PaletteForm
