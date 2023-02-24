import axios from 'axios'
import Cookie from 'js-cookie'

const downloadFromApi = ( name, endpoint, params = {} ) =>
  axios
    .get( endpoint, {
      headers: { Authorization: Cookie.get( 'Authorization' ) },
      params,
      responseType: 'blob',
    } )
    .then( ( { data, headers } ) => {
      const type = headers['content-type']
      const blob = new Blob( [ data ], {
        encoding: 'UTF-8',
        type: type,
      } )
      const link = document.createElement( 'a' )

      link.href = window.URL.createObjectURL( blob )
      link.download = name
      link.click()
      link.remove()
    } )

export default downloadFromApi
