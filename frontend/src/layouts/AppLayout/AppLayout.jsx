import { useContext, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Outlet } from 'react-router-dom'

import './AppLayout.scss'

import AuthContext from '@/context/AuthContext'
import Header from './Header'

const AppLayout = () => {
  const { userData, fetchUserData } = useContext( AuthContext )

  useEffect( () => {
    if ( !userData ) {
      fetchUserData()
    }
  }, [ userData, fetchUserData ] )

  if ( isEmpty( userData?.info ) ) {
    return null
  }

  return (
    <div className='app-layout'>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout