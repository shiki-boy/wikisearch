/* eslint-disable sort-vars */
const base = '/api'

const loginURL = `${ base }/auth/login`,
      refreshTokenURL = `${ base }/auth/token/refresh/`,
      logoutURL = `${ base }/auth/logout`

export { loginURL, refreshTokenURL, logoutURL }
