import React, { useContext, useEffect } from 'react'

import './AppLayout.scss'

import AuthContext from '@/context/AuthContext'

import { isEmpty } from 'lodash'
import { Outlet } from 'react-router-dom'

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
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout