import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      palettes: []
    }
  }

  componentDidMount = async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/api/v1/projects'
    const response = await fetch(url)
    const data = response.json()
    console.log(data)
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Palette Picker</h1>
          {/* generate button */}
          {/* projects button */}
        </header>
        {/* random palette */}
        {/* save palette */}
      </div>
    )
  }
}

export default App;
