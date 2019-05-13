import React from 'react'
import DisplayProject from '../../components/DisplayProject/DisplayProject'
import { connect } from 'react-redux'
import './AllProjects.css'

export const AllProjects = (props) => {
    
    const projects = props.projects.map(project => {
      return <DisplayProject key={project.id} project={project}/>
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

export default connect(mapStateToProps)(AllProjects)