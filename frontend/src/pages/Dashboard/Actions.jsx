import { useNavigate } from 'react-router-dom'

import './Actions.scss'

import { DeleteIcon, SearchIcon } from '@/assets/icons'

import Icon from '@/components/Icon'
import useApi from '@/hooks/useApi'

const Actions = ( { row } ) => {
  const navigate = useNavigate()

  const { mutate: deleteSearch } = useApi( 'delete', '/api/search' )

  return (
    <div className='dashboard-table-actions'>
      <Icon
        IconComponent={ SearchIcon }
        className='primary md pointer'
        onClick={ () => navigate( `/search?query=${ row.query }` ) }
      />

      <Icon
        IconComponent={ DeleteIcon }
        className='danger md pointer'
        onClick={ () => deleteSearch( row.uid ) }
      />
    </div>
  )
}

export default Actions
