import React from 'react'
import { connect } from 'react-redux'
import './Project.css'
import PaletteDisplay from '../PaletteDisplay/PaletteDisplay'

export const Project = (props) => {
    const { name, id } = props.project
    const palettes = props.palettes.filter(palette => {
      return palette.project_id === id
    }).map(palette => {
      return <PaletteDisplay key={palette.id} palette={palette}/>
    })

    return(
      <div className='project-card'>
        <h2 className='project-name'>
          {name}
        </h2>
        {palettes}
      </div>
    )
}

const mapStateToProps = (state) => ({
  palettes: state.palettes
})

export default connect(mapStateToProps)(Project)
