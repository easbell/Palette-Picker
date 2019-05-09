import React, { Component } from 'react';
import './App.css';
import Palette from '../Palette/Palette'

export class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      palettes: []
    }
  }

  componentDidMount = async () => {
    const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects'
    const response = await fetch(url)
    const data = await response.json()
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Palette Picker</h1>
          {/* generate button */}
          {/* projects button */}
        </header>
        <Palette />
        <div>
          {/* save palette */}
        </div>
      </div>
    )
  }
}

export default App;
