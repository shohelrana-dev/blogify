import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '~/utils/axios-instance'
import getApiErrorMessage from '~/utils/get-api-error-message'
import { setSession } from '~/utils/session'

export function useSignupMutation() {
   return useMutation({
      mutationFn: (userData) => api.post('/auth/register', userData),
      mutationKey: ['auth/sigunup'],
      onSuccess: ({ token, user }) => {
         toast.success('Signup success.')
         setSession({ token, user })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useLoginMutation() {
   return useMutation({
      mutationFn: (credentials) => api.post('/auth/login', credentials),
      mutationKey: ['auth/login'],
      onSuccess: ({ token, user }) => {
         toast.success('Loggedin.')
         setSession({ token, user })
      },
      onError: (err) => {
         let message = getApiErrorMessage(err)
         message = message === 'User not found' ? `User not found with the email.` : message
         toast.error(message)
      },
   })
}
