import { formatISO, parseISO, sub } from 'date-fns'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import './Dashboard.scss'

import DataTable from '@/components/DataTable'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import dateTimeFormatter from '@/utils/dateTimeFormatter'

import Actions from './Actions'
import Button from '@/components/Button'

const Dashboard = () => {
  const [ dateTimeFilter, setDateTimeFilter ] = useState()

  const columns = [
    { key: 'query' },
    {
      extractData: dateTimeFormatter,
      key: 'created',
    },
  ]

  const getPastDate = ( option ) => {
    // option can be days or hours
    const date = formatISO( sub( new Date(), option ) )

    setDateTimeFilter( date )
  }

  return (
    <div className='dashboard'>
      <h2>Your Searches</h2>

      <FormLabel name='date_to' field='Filter by Date/Time'>
        <ReactDatePicker
          selected={ dateTimeFilter ? parseISO( dateTimeFilter ) : null }
          todayButton='Today'
          onChange={ ( val ) => {
            setDateTimeFilter( val ? formatISO( val ) : null )
          } }
          isClea
          isClearable={ true }
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          placeholderText='Filter by Date/Time'
          dateFormat='yyyy-MM-dd | h:mm aaa'
          showTimeInput
        />
      </FormLabel>

      <div className='buttons'>
        <Button
          title='Past 7 days'
          color='secondary'
          onClick={ () => getPastDate( { days: 7 } ) }
        />

        <Button
          title='Past 1 day'
          color='secondary'
          onClick={ () => getPastDate( { days: 1 } ) }
        />

        <Button
          title='Past 1 hour'
          color='secondary'
          onClick={ () => getPastDate( { hours: 1 } ) }
        />
      </div>

      <DataTable
        columns={ columns }
        endpoint='/api/search'
        filters={ { created__gte: dateTimeFilter } }
        Actions={ Actions }
      />
    </div>
  )
}

export default Dashboard
