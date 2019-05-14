import React, { Component } from 'react';
import './App.css';
import Palette from '../../components/Palette/Palette';
import { handleFetch } from '../../thunks/handleFetch';
import { connect } from 'react-redux';
import { setProjects, setPalettes } from '../../actions';
import { Route, Switch, Link, NavLink, withRouter } from 'react-router-dom';
import AllProjects from '../AllProjects/AllProjects';
import EditProject from '../EditProject/EditProject';
import { PageNotFound } from '../../components/PageNotFound/PageNotFound';
import cogoToast from 'cogo-toast';

export class App extends Component {
  componentDidMount = () => {
    const allProjects = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects';
    const allPalettes = process.env.REACT_APP_BACKEND_URL + 'api/v1/palettes';
    this.props.handleFetch(allProjects, setProjects)
    this.props.handleFetch(allPalettes, setPalettes)
    this.checkForErrors();
  }

  checkForErrors = () => {
    if(this.props.error.length > 1) {
      cogoToast.error('There was an error.', {position: 'bottom-left'});
    }
  }

  findProject = ({ match }) => {
    const foundProject = this.props.projects.find(project => project.id == match.params.id)
      return <EditProject foundProject={foundProject} />
  }

  render() {
    return (
      <div className='App'>
        <header className='header'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h1 className='logo'>Palette Picker</h1>
          </Link>
          <NavLink exact to='/my-projects' style={{ textDecoration: 'none' }}>
            <h3 className='links'>My Projects</h3>
          </NavLink>
        </header>
        <div>
          <Switch>
            <Route exact path='/'
              render={() => <Palette />}
            />
            <Route exact path='/my-projects'
              render={() => <AllProjects />}
            />
            <Route exact path='/my-projects/:id'
              render={this.findProject}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects,
  error: state.hasErrored
})

export const mapDispatchToProps = (dispatch) => ({
  handleFetch: (url, action) => dispatch(handleFetch(url, action))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
