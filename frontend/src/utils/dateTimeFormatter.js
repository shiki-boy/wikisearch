import { format } from 'date-fns'

const dateTimeFormatter = ( data ) => {
  if ( !data ) return '-'
  return format( new Date( data ), 'MM-dd-yyyy h:mm a' )
}

export default dateTimeFormatter