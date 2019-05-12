import React from 'react'
import '../../components/PaletteDisplay/PaletteDisplay.css'

export const EditPalette = ({palette}) => {
    const { palette_name, color_1, color_2, color_3, color_4, color_5 } = palette
    
    return(
      <div className='edit-palette-card'>
        <div className='palette-card edit-palette'>
          <h3 className='palette-name'>
            {palette_name}
          </h3>
          <div className='display-colors'>
            <div style={{backgroundColor: color_1}} className='display-color'></div>
            <div style={{backgroundColor: color_2}} className='display-color'></div>
            <div style={{backgroundColor: color_3}} className='display-color'></div>
            <div style={{backgroundColor: color_4}} className='display-color'></div>
            <div style={{backgroundColor: color_5}} className='display-color'></div>
          </div>
        </div>
        <div className='delete-palette'><i className="far fa-trash-alt"></i></div>
      </div>
    )
}

export default EditPalette

