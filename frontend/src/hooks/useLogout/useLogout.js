import { useContext } from 'react'
import Cookie from 'js-cookie'

import useApi from '@/hooks/useApi'
import httpClient from '@/hooks/useApi/httpClient'
import AuthContext from '@/context/AuthContext'
import { logoutURL } from '@/router/apiEndpoint'

const useLogout = () => {
  const { setUserData } = useContext( AuthContext )

  const { mutateAsync, isError } = useApi( 'post', logoutURL )

  const deleteCookies = () => {
    delete httpClient.defaults?.headers['Authorization']
    // if suppose AuthContext is not available

    Cookie.remove( 'Authorization' )

    if ( setUserData ) {
      setUserData( null )
    }

    Cookie.remove( 'refreshToken', { path: '/' } )

    const requestedUrl = !window.location.pathname.includes( '/logout' )
    //   ? `?next=${ window.location.pathname }`
    //   : ''

    // window.location.href = `${ import.meta.env.VITE_REDIRECT_BASE_URL }${ requestedUrl }`
  }

  const logout = () => {
    mutateAsync().then( ( data ) => {
      if ( data?.redirect_url ) {
        deleteCookies( true )
        return
      }
      deleteCookies()
    } )
  }

  return {
    deleteCookies,
    error: isError,
    logout,
  }
}

export default useLogout
