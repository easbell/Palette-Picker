import React, { Component } from 'react';
import './App.css';
import Palette from '../../Palette/Palette';
import { handleFetch } from '../../thunks/handleFetch';
import { connect } from 'react-redux';
import { setProjects, setPalettes } from '../../actions';
import { Route, Switch, Link, NavLink, withRouter } from 'react-router-dom'
import AllProjects from '../../containers/AllProjects/AllProjects'
import EditProject from '../EditProject/EditProject'

export class App extends Component {
  componentDidMount = () => {
  const allProjects = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects';
  const allPalettes = process.env.REACT_APP_BACKEND_URL + 'api/v1/palettes';
  this.props.handleFetch(allProjects, setProjects)
  this.props.handleFetch(allPalettes, setPalettes)
  }

  findProject = ({ match }) => {
    const foundProject = this.props.projects.find(project => project.id == match.params.id)
    
    if(!foundProject) {
      return '404 Project not found'
    } else {
      return <EditProject foundProject={foundProject} />
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <Link to='/'>
            <h1>Palette Picker</h1>
          </Link>
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
              render={() => <AllProjects />}
            />
            <Route 
              exact path='/my-projects/:id'
              render={this.findProject}
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

export const mapStateToProps = (state) => ({
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  handleFetch: (url, action) => dispatch(handleFetch(url, action))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
