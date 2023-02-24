import { kebabCase } from 'lodash'

import Search from './Search'
import ViewPage from './ViewPage'

export default {
  Search,
  ViewPage,
}

const createPagesConf = ( pagesList ) =>
  pagesList.map( ( { name, roles, ...rest } ) => ( {
    component: name,
    link: kebabCase( name ),
    roles,
    title: kebabCase( name ).split( '-' ).join( ' ' ),
    ...rest,
  } ) )

const mainPages = [
  { name: 'Search' },
  { name: 'ViewPage' },
]

export const mainPagesConf = createPagesConf( mainPages )
