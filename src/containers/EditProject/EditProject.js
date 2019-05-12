import React from 'react'
import { connect } from 'react-redux'
import '../../components/Project/Project.css'
import EditPalette from '../EditPalette/EditPalette'

export const EditProject = (props) => {
  const { name, id } = props.foundProject
  const palettes = props.palettes.filter(palette => {
    return palette.project_id === id}).map(palette => {
      return <EditPalette key={palette.id} palette={palette}/>
    })
    
  return (
    <div className='project-card'>
      <h2 className='project-name'>{name}</h2>
      {palettes}
    </div>
  )
}

const mapStateToProps = (state) => ({
  palettes: state.palettes
})

export default connect(mapStateToProps)(EditProject)