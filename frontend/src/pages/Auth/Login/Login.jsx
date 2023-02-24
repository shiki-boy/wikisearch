import { useContext, useEffect } from 'react'

import Form from '@/components/Forms/Form'
import AuthContext from '@/context/AuthContext'
import { loginURL } from '@/router/apiEndpoint'

import LoginForm from './LoginForm'
import httpClient from '@/hooks/useApi/httpClient'

const Login = () => {
  const { setUserData } = useContext( AuthContext )

  const onSuccess = async ( responseData ) => {
    console.log( responseData )
    const { data } = await httpClient.post(
      'http://localhost:8000/api/auth/google/verify/',
      { access_token: responseData.credential },
    )

    console.log( { data } )
  }

  useEffect( () => {
    /* global google */
    google.accounts.id.initialize( {
      callback: onSuccess,
      client_id: import.meta.env.GOOGLE_CLIENT_ID,
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
        {/* <Form
          method='post'
          endpoint={ loginURL }
          onSuccess={ onSuccess }
          showOnlyToastErrors={ true }
          FormBody={ ( props ) =>
            LoginForm( { ...props } )
          }
        /> */}
      </div>
    </>
  )
}

export default Login
