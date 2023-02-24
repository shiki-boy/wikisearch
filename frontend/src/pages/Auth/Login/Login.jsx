import { useContext, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import AuthContext from '@/context/AuthContext'
import httpClient from '@/hooks/useApi/httpClient'

const Login = () => {
  const navigate = useNavigate()
  const { setUserData } = useContext( AuthContext )

  const onSuccess = async ( googleResponseData ) => {
    const { data } = await httpClient.post(
      '/api/auth/google/verify/',
      { access_token: googleResponseData.credential },
    )

    // set jwt cookies
    const accessTokenExpires = new Date(
      jwtDecode( data.access_token ).exp * 1000,
    )
    const refreshTokenExpires = new Date(
      jwtDecode( data.refresh_token ).exp * 1000,
    )

    Cookies.set( 'Authorization', `Bearer ${ data.access_token }`, { expires: accessTokenExpires } )

    Cookies.set( 'refreshToken', data.refresh_token, { expires: refreshTokenExpires } )

    setUserData( { info: data.user } )

    navigate( '/dashboard' )
  }

  useEffect( () => {
    /* global google */
    google.accounts.id.initialize( {
      callback: onSuccess,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    } )

    google.accounts.id.renderButton( document.getElementById( 'google-sign-in' ), { theme: 'filled_blue' } )
  }, [] )

  return (
    <>
      <div>
        <h1>Log in</h1>

        <div id='google-sign-in'></div>

        {/* <div id='g_id_onload'
          data-client_id=''
          data-context='signin'
          data-ux_mode='popup'
          // data-login_uri='http://localhost:8000/api/auth/google/verify/'
          data-callback='onSuccess'
          data-nonce=''
          data-auto_prompt='false'>
        </div>

        <div className='g_id_signin'
          data-type='standard'
          data-shape='pill'
          data-theme='filled_blue'
          data-text='signin_with'
          data-size='large'
          data-logo_alignment='left'>
        </div> */}
      </div>
    </>
  )
}

export default Login
