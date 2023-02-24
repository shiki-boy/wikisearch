import { useFormContext } from 'react-hook-form'

import Button from '@/components/Button'
import Password from '@/components/Password'
import FormLabel from '@/components/Forms/Helpers/FormLabel'

const LoginForm = ( { goToForgotPassword, isLoading, goToSignUp } ) => {
  const { register, formState, setValue } = useFormContext()

  return (
    <div className='login-form'>
      <h1>Log in</h1>
    </div>
  )
}

export default LoginForm
