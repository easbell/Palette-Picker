import React from 'react'
import { connect } from 'react-redux'
import './DisplayProject.css'
import DisplayPalette from '../DisplayPalette/DisplayPalette'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const DisplayProject = (props) => {
    const { name, id } = props.project
    const palettes = props.palettes.filter(palette => {
      return palette.project_id === id
    }).map(palette => {
      return <DisplayPalette key={palette.id} palette={palette}/>
    })

    return(
      <Link to={`/my-projects/${id}`} style={{ textDecoration: 'none' }}>
        <div className='project-card'>
            <h2 className='project-name'>
              {name}
            </h2>
            {palettes}
        </div>
      </Link>
    )
}

export const mapStateToProps = (state) => ({
  palettes: state.palettes
})

DisplayProject.propTypes = {
  project: PropTypes.object,
  palettes: PropTypes.array
}

export default connect(mapStateToProps)(DisplayProject)
