import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import './AuthLayout.scss'

import classNames from 'classnames'

const AuthLayout = () => (
  <div
    className={ classNames(
      'auth-layout',
    ) }
  >
    <div className='auth-content'>
      <div className='auth-card'>
        <Outlet />
      </div>
    </div>
  </div>
)

export default AuthLayout
