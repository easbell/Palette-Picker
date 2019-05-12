import React from 'react'
import { connect } from 'react-redux'
import './Project.css'

export const Project = (props) => {
    const { name, id } = props.project
    const palettes = props.palettes.filter(palette => {
      return palette.project_id === id
    }).map(palette => {
      return <div key={palette.id} className='palette-display'>         {palette.palette_name}<div style={{backgroundColor: palette.color_1}}>{palette.color_1}</div><div style={{backgroundColor: palette.color_2}}>{palette.color_2}</div><div style={{backgroundColor: palette.color_3}}>{palette.color_3}</div><div style={{backgroundColor: palette.color_4}}>{palette.color_4}</div><div style={{backgroundColor: palette.color_5}}>{palette.color_5}</div>
      </div>
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