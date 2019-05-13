import React from 'react'
import { connect } from 'react-redux'
import './DisplayProject.css'
import DisplayPalette from '../DisplayPalette/DisplayPalette'
import { Link } from 'react-router-dom'

export const DisplayProject = (props) => {
    const { name, id } = props.project
    const palettes = props.palettes.filter(palette => {
      return palette.project_id === id
    }).map(palette => {
      return <DisplayPalette key={palette.id} palette={palette}/>
    })

    return(
      <div className='project-card'>
        <Link to={`/my-projects/${id}`} style={{ textDecoration: 'none' }}>
          <h2 className='project-name'>
            {name}
          </h2>
          {palettes}
        </Link>
      </div>
    )
}

const mapStateToProps = (state) => ({
  palettes: state.palettes
})

export default connect(mapStateToProps)(DisplayProject)
