import { formatISO, parseISO } from 'date-fns'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import './Dashboard.scss'

import DataTable from '@/components/DataTable'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import dateTimeFormatter from '@/utils/dateTimeFormatter'

import Actions from './Actions'

const Dashboard = () => {
  const [ dateTimeFilter, setDateTimeFilter ] = useState()

  const columns = [
    { key: 'query' },
    {
      extractData: dateTimeFormatter,
      key: 'created',
    },
  ]

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
