import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './Search.scss'

import Button from '@/components/Button'
import DataTable from '@/components/DataTable'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import useApi from '@/hooks/useApi'

import PageItem from './PageItem'

const Search = () => {
  const [ searchParams ] = useSearchParams()
  const _searchQuery = searchParams.get( 'query' )

  const navigate = useNavigate()

  const { mutate: saveSearch } = useApi( 'post', '/api/search' )

  const [ search, setSearch ] = useState( _searchQuery ?? '' )
  const [ result, setResult ] = useState( [] )
  const [ isLoading, setIsLoading ] = useState( false )

  useEffect( () => {
    if ( _searchQuery ) {
      handleSearch( false )
    }
  }, [] )

  const handleSearch = async ( autoSave = true ) => {
    setIsLoading( true )
    const { data } = await axios
      .get( 'https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'opensearch',
          format: 'json',
          origin: '*',
          search,
        },
      } )


    formatResponse( data )

    setIsLoading( false )

    if ( autoSave ) {
      saveSearch( { query: search } )
    }
  }

  const formatResponse = ( data ) => {
    const pageTitles = data[1].map( ( el ) => ( { title: el } ) )
    const results = pageTitles

    setResult( results )
  }

  const columns = [ {
    extractData: ( ...rest ) => PageItem( ...rest, navigate ),
    key: 'title',
    title: 'Page title',
  } ]

  return (
    <div className='search-page'>
      <h1>Search Wiki Pages</h1>

      <form>
        <FormLabel name='search' field='Search pages' required>
          <input
            type='search'
            name='search'
            placeholder='Search pages'
            value={ search }
            onChange={ ( { target } ) => setSearch( target.value ) }
          />
        </FormLabel>

        <Button
          title='Search'
          color='primary'
          type='submit'
          isLoading={ isLoading }
          loadingText='Searching...'
          onClick={ handleSearch }
        />

        <Button
          title='My Searches'
          color='tertiary dashboard-btn'
          type='button'
          onClick={ () => navigate( '/dashboard' ) }
        />
      </form>

      <DataTable
        columns={ columns }
        rows={ result }
      />
    </div>
  )
}

export default Search
