import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '~/utils/axios-instance'
import getApiErrorMessage from '~/utils/get-api-error-message'

export function useGetProfileQuery() {
   return useQuery({
      queryFn: (userId) => api.get(`/profile/${userId}`),
      queryKey: (userId) => [`profile/${userId}`],
   })
}

export function useUpdateProfileMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (payload) => api.patch(`/profile`, payload),
      mutationKey: ['updateProfile'],
      onSuccess: ({ user }) => {
         toast.success('Profile updated.')
         queryClient.invalidateQueries({ queryKey: [`profile/${user?.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useUploadAvatarMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (formData) => {
         return api.post(`/profile/avatar`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })
      },
      mutationKey: ['uploadAvatar'],
      onSuccess: ({ user, message }) => {
         toast.success(message || 'Profile photo uploaded.')
         queryClient.invalidateQueries({ queryKey: [`profile/${user?.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}
