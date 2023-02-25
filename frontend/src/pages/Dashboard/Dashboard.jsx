import DataTable from '@/components/DataTable'
import dateTimeFormatter from '@/utils/dateTimeFormatter'
import Actions from './Actions'

import './Dashboard.scss'

const Dashboard = () => {
  const columns = [ { key: 'query' }, {
    extractData: dateTimeFormatter,
    key: 'created',
  } ]

  return (
    <div className='dashboard'>
      <h2>Your Searches</h2>

      <DataTable columns={ columns } endpoint='/api/search' Actions={ Actions } />
    </div>
  )
}

export default Dashboard
