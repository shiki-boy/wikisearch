import React from 'react'
import { useFormContext } from 'react-hook-form'

import './IterableReportFilters.scss'

import { DeleteIcon } from '../../../../assets/icons'

import ControlledSelect from '../ControlledSelect'
import FormLabel from '../FormLabel'
import Button from '../../../Button'

const options = [
  {
    name: 'Equal To',
    value: '=',
  },
  {
    name: 'Not Equal To',
    value: '!=',
  },
]

const IterableReportFilters = ( {
  index,
  inputFileUid,
  fileColumns,
  remove,
  defaultValue,
} ) => {
  const { register, trigger } = useFormContext()

  if (
    defaultValue?.input_file_uuid
    && defaultValue?.input_file_uuid !== inputFileUid
  ) {
    return null
  }

  return (
    <div className='report-filters-fields'>
      <input
        type='hidden'
        { ...register( `filters.${ index }.input_file_uuid`, { value: inputFileUid } ) }
      />

      <ControlledSelect
        name={ `filters.${ index }.file_column` }
        label='File Column'
        defaultOptions={ fileColumns }
        rules={ { required: 'This field is required' } }
      />

      <ControlledSelect
        name={ `filters.${ index }.operator` }
        label='Operation'
        defaultOptions={ options }
        rules={ { required: 'This field is required' } }
      />

      <FormLabel field='Value' name={ `filters.${ index }.criteria` }>
        <input
          type='text'
          { ...register( `filters.${ index }.criteria`, {
            // deps: [ `filters.${ index }.operator`, `filters.${ index }.file_column` ],
            onChange: () => {
              trigger( `filters.${ index }.criteria` )
            },
            required: 'This field is required',
          } ) }
        />
      </FormLabel>

      <Button
        IconComponent={ DeleteIcon }
        iconClassName='danger md'
        color='danger secondary remove-btn'
        type='button'
        onClick={ () => remove( index ) }
      />
    </div>
  )
}

export default IterableReportFilters
