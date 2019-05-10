import React, { Component } from 'react';
import './App.css';
import Palette from '../../Palette/Palette';
import { handleFetch } from '../../thunks/handleFetch';
import { connect } from 'react-redux';
import { setProjects } from '../../actions';

export class App extends Component {
  componentDidMount = () => {
  const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects';
  this.props.handleFetch(url, setProjects)
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
