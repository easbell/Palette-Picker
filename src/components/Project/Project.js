import React from 'react'
import { connect } from 'react-redux'

export const Project = (props) => {
    const { name, id } = props.project
    const palettes = props.palettes.filter(palette => {
      return palette.project_id === id
    }).map(palette => {
      return <div key={palette.id}>{palette.palette_name}</div>
    })

    return(
      <div>
        {name}
        {palettes}
      </div>
    )
}

const mapStateToProps = (state) => ({
  palettes: state.palettes
})

export default connect(mapStateToProps)(Project)