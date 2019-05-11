import React, { Component } from 'react';
import './App.css';
import Palette from '../../Palette/Palette';
import { handleFetch } from '../../thunks/handleFetch';
import { connect } from 'react-redux';
import { setProjects, setPalettes } from '../../actions';
import { Route, Switch, Link, NavLink } from 'react-router-dom'
import Projects from '../../containers/Projects/Projects'

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
          <Link to='/'>
            <h1>Palette Picker</h1>
          </Link>
          {/* generate button */}
          <NavLink
            exact to='/my-projects'
          >
            My Projects
          </NavLink>
        </header>
        <div>
          <Switch>
            <Route
              exact path='/'
              render={() => <Palette />}
            />
            <Route 
              exact path='/my-projects'
              render={() => <Projects />}
            />
          </Switch>
        </div>
        
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
