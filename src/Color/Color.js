import React from 'react';

export const Color = ({color}) => {

  return (
    <div style={{backgroundColor: color}} className='color'>
      {color}
    </div>
  )
}

export default Color