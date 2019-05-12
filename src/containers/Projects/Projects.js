import React from 'react'
import Project from '../../components/Project/Project'
import { connect } from 'react-redux'
import './Projects.css'

export const Projects = (props) => {
    
    const projects = props.projects.map(project => {
      return <Project key={project.id} project={project}/>
    })
    
    return(
      <div className='projects-container'>
        {projects}
      </div>
    )
}

const mapStateToProps = (state) => ({
  projects: state.projects
})

export default connect(mapStateToProps)(Projects)