import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import PasswordField from '~/components/form/PasswordField'
import TextField from '~/components/form/TextField'
import AuthLayout from '~/components/layouts/AuthLayout'
import Button from '~/components/ui/Button'
import useAuthDispatch from '~/hooks/useAuthDispatch'
import { useSignupMutation } from '~/services/auth.service'
import { APP_NAME } from '~/utils/constants'
import { signupRules as rules } from '~/utils/validation-rules'

export default function SignupPage() {
   const { register, handleSubmit, formState, reset } = useForm()
   const signupMutation = useSignupMutation()
   const dispatch = useAuthDispatch()

   const { errors } = formState

   useEffect(() => {
      document.title = `Signup | ${APP_NAME}`
   }, [])

   async function handleSignup(payload) {
      try {
         const { user } = await signupMutation.mutateAsync(payload)
         reset()
         dispatch({ type: 'loggedin', payload: user })
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <AuthLayout title='Signup'>
         <form autoComplete='off' onSubmit={handleSubmit(handleSignup)}>
            <TextField
               label='First Name'
               error={errors.firstName}
               {...register('firstName', rules.firstName)}
            />

            <TextField
               label='Last Name'
               error={errors.lastName}
               {...register('lastName', rules.lastName)}
            />

            <TextField label='Email Address' error={errors.email} {...register('email', rules.email)} />

            <PasswordField
               label='Password'
               error={errors.password}
               {...register('password', rules.password)}
            />

            <div className='mb-6'>
               <Button type='submit' isLoading={signupMutation.isPending} fullWidth>
                  Create Account
               </Button>
            </div>

            <p className='text-center'>
               Already have account?{' '}
               <Link to='/auth/login' className='text-indigo-600 hover:underline'>
                  Login
               </Link>
            </p>
         </form>
      </AuthLayout>
   )
}
