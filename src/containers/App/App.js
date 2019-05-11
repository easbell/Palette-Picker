import React, { Component } from 'react';
import './App.css';
import Palette from '../../Palette/Palette';
import { handleFetch } from '../../thunks/handleFetch';
import { connect } from 'react-redux';
import { setProjects, setPalettes } from '../../actions';

export class App extends Component {
  componentDidMount = () => {
  const allProjects = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects';
  const allPalettes = process.env.REACT_APP_BACKEND_URL + 'api/v1/palettes';
  this.props.handleFetch(allProjects, setProjects)
  this.props.handleFetch(allPalettes, setPalettes)
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
  handleFetch: (url, action) => dispatch(handleFetch(url, action))
})

export default connect(null, mapDispatchToProps)(App);
