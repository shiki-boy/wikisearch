import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import './ViewPage.scss'

import Icon from '@/components/Icon'
import { PreviousPageIcon } from '@/assets/icons'

const ViewPage = () => {
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()
  const page = searchParams.get( 'title' )

  const [ isLoading, setIsLoading ] = useState( false )
  const [ result, setResult ] = useState( '' )

  useEffect( () => {
    fetchPageContent()
  }, [] )

  const fetchPageContent = async () => {
    setIsLoading( true )
    const { data } = await axios.get( 'https://en.wikipedia.org/w/api.php', {
      params: {
        // action: 'opensearch',
        action: 'parse',
        format: 'json',
        origin: '*',
        // search: 'atoms',
        page,
        prop: 'text',
      },
    } )

    setResult( data.parse.text['*'] )

    setIsLoading( false )
  }

  if ( isLoading ) {
    return <p>Loading...</p>
  }

  return (
    <div className='view-page'>
      <h5 onClick={ () => navigate( -1 ) }>
        <Icon IconComponent={ PreviousPageIcon } className='md' />
        Go back
      </h5>

      <div dangerouslySetInnerHTML={ { __html: result } }></div>
    </div>
  )
}

export default ViewPage
