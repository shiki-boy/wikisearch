import { kebabCase } from 'lodash'

import Dashboard from './Dashboard'

export default { Dashboard }

const createPagesConf = ( pagesList ) =>
  pagesList.map( ( { name, roles, ...rest } ) => ( {
    component: name,
    link: kebabCase( name ),
    roles,
    title: kebabCase( name ).split( '-' ).join( ' ' ),
    ...rest,
  } ) )

const mainPages = [
  { name: 'Dashboard' },
]

export const mainPagesConf = createPagesConf( mainPages )
