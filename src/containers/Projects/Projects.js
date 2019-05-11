import React from 'react'
import Project from '../../components/Project/Project'
import { connect } from 'react-redux'

export const Projects = (props) => {
    
    const projects = props.projects.map(project => {
      return <Project key={project.id} project={project}/>
    })
    
    return(
      <div>
        {projects}
      </div>
    )
}

const mapStateToProps = (state) => ({
  projects: state.projects
})

export default connect(mapStateToProps)(Projects)