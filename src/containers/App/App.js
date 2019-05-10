import React, { Component } from 'react';
import './App.css';
import Palette from '../../Palette/Palette'
import { fetchProjects } from '../../thunks/fetchProjects'
import { connect } from 'react-redux'

export class App extends Component {

  componentDidMount = () => {
    this.props.fetchProjects()
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

export const mapDispatchToProps = (dispatch) => ({
  fetchProjects: () => dispatch(fetchProjects())
})

export default connect(null, mapDispatchToProps)(App);
