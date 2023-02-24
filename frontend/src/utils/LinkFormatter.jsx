import React from 'react'

const LinkFormatter = ( value, row, linkText ) => (
  <a href={ value } className='link' target='_blank' rel='noreferrer'>
    {linkText}
  </a>
)

export default LinkFormatter
