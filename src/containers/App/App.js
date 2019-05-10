import React, { Component } from 'react';
import './App.css';
import Palette from '../../Palette/Palette'
import { fetchProjects } from '../../thunks/fetchProjects'
import { pathHelper } from '../../thunks/fetchProjects'
import { connect } from 'react-redux'
import { setProjects } from '../../actions'

export class App extends Component {

  componentDidMount = () => {
  const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects';
  this.props.fetchProjects(url, setProjects)
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
  fetchProjects: (url, action) => dispatch(fetchProjects(url, action))
})

export default connect(null, mapDispatchToProps)(App);
