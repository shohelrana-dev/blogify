import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import PasswordField from '~/components/form/PasswordField'
import TextField from '~/components/form/TextField'
import AuthLayout from '~/components/layouts/AuthLayout'
import Button from '~/components/ui/Button'
import useAuthDispatch from '~/hooks/useAuthDispatch'
import { useLoginMutation } from '~/services/auth.service'
import { loginRules as rules } from '~/utils/validation-rules'

export default function LoginPage() {
   const { register, handleSubmit, formState, reset } = useForm()
   const loginMutation = useLoginMutation()
   const dispatch = useAuthDispatch()

   const { errors } = formState

   async function handleLogin(payload) {
      try {
         const { user } = await loginMutation.mutateAsync(payload)
         reset()
         dispatch({ type: 'loggedin', payload: user })
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <AuthLayout title='Login'>
         <form onSubmit={handleSubmit(handleLogin)}>
            <TextField label='Email' error={errors.email} {...register('email', rules.firstName)} />

            <PasswordField
               label='Password'
               error={errors.password}
               {...register('password', rules.password)}
            />

            <div className='mb-6'>
               <Button type='submit' isLoading={loginMutation.isPending} fullWidth>
                  Login
               </Button>
            </div>

            <p className='text-center'>
               Don&apos;t have an account?{' '}
               <Link to='/auth/signup' className='text-indigo-600 hover:underline'>
                  Signup
               </Link>
            </p>
         </form>
      </AuthLayout>
   )
}
