import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../components/DisplayPalette/DisplayPalette.css';
import { setPalettes, editPalette } from '../../actions';
import { handleDelete } from '../../thunks/handleDelete';
import { handleFetch } from '../../thunks/handleFetch'
import cogoToast from 'cogo-toast';

export class EditPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paletteName: this.props.palette.palette_name
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleBlur = async () => {
    const palette_name = this.state.paletteName
    const { color_1, color_2, color_3, color_4, color_5, id} = this.props.palette
    const paletteUrl = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${id}/`
    const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/palettes'
    const optionsObject = {
      method: 'PUT',
      body: JSON.stringify({
        palette_name,
        color_1,
        color_2,
        color_3,
        color_4,
        color_5
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await this.props.handleFetch(paletteUrl, editPalette, optionsObject)
    this.props.handleFetch(url, setPalettes)
  }

  deletePalette = (id) => {
    const updatedPalettes = this.props.palettes.filter(palette => { 
      return palette.id !== id
    })
    const url = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${id}`
    this.props.handleDelete(url, setPalettes, updatedPalettes, id)
    cogoToast.success('Palette was deleted.', {position: 'bottom-left'});
  }

  render() {
    const { id, color_1, color_2, color_3, color_4, color_5 } = this.props.palette

  return(
    <div className='edit-palette-card' onBlur={this.handleBlur}>
      <div className='palette-card edit-palette'>
        <input
          className='palette-name'
          name='paletteName'
          value={this.state.paletteName}
          onChange={this.handleChange}
        />
        <div className='display-colors'>
          <div style={{backgroundColor: color_1}} className='display-color'></div>
          <div style={{backgroundColor: color_2}} className='display-color'></div>
          <div style={{backgroundColor: color_3}} className='display-color'></div>
          <div style={{backgroundColor: color_4}} className='display-color'></div>
          <div style={{backgroundColor: color_5}} className='display-color'></div>
        </div>
      </div>
      <div className='delete-palette' onClick={() => this.deletePalette(id)}><i className="far fa-trash-alt"></i></div>
    </div>
  )
}
}
export const mapStateToProps = (state) => ({
  palettes: state.palettes,
})

export const mapDispatchToProps = (dispatch) => ({
  handleDelete: (url, action, items, id) => dispatch(handleDelete(url, action, items, id)),
  handleFetch: (url, action, options) => dispatch(handleFetch(url, action, options))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPalette)

