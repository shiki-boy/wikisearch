import React, { memo } from 'react'
import { Controller } from 'react-hook-form'

import Picker from 'react-datepicker'

const DatePicker = ( { name, placeholder } ) => (
  <Controller
    name={ name }
    placeholderText={ placeholder }
    defaultValue={ new Date() }
    render={ ( { onChange, value } ) => (
      <Picker
        selected={ value ? new Date( value ) : new Date() }
        onChange={ onChange }
        todayButton='Today'
        showTimeSelect={ false }
        peekNextMonth
        showMonthDropdown
        isClearable={ true }
        dropdownMode='select'
        showYearDropdown
        dateFormat='yyyy-MM-dd'
      />
    ) }
  />
)

export default memo( DatePicker )
