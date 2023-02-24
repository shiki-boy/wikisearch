import Button from '@/components/Button'
import DataTable from '@/components/DataTable'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageItem from './PageItem'

const Search = () => {
  const navigate = useNavigate()
  const [ search, setSearch ] = useState( '' )
  const [ result, setResult ] = useState( [] )
  const [ isLoading, setIsLoading ] = useState( false )

  useEffect( () => {
  }, [] )

  const handleSearch = async () => {
    setIsLoading( true )
    const { data } = await axios
      .get( 'https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'opensearch',
          // action: 'parse',
          format: 'json',
          origin: '*',
          search: 'atoms',
          // page: 'Atoms for Peace',
          // prop: 'text',
        },
      } )


    formatResponse( data )
    setIsLoading( false )
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
    <div>
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
          loadingText='Signing in...'
          onClick={ handleSearch }
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
