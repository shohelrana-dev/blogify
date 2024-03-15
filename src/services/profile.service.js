import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useAuthState from '~/hooks/useAuthState'
import { api } from '~/utils/axios-instance'
import getApiErrorMessage from '~/utils/get-api-error-message'
import { updateSession } from '~/utils/session'

export function useGetProfileQuery(userId) {
   return useQuery({
      queryFn: () => api.get(`/profile/${userId}`),
      queryKey: [`profile/${userId}`],
      enabled: !!userId,
   })
}

export function useUpdateProfileMutation() {
   const queryClient = useQueryClient()
   const { user } = useAuthState()
   return useMutation({
      mutationFn: (payload) => api.patch(`/profile`, payload),
      mutationKey: ['profile/update'],
      onMutate: async (payload) => {
         await queryClient.cancelQueries({ queryKey: [`profile/${user.id}`] })
         const prevData = queryClient.getQueryData([`profile/${user.id}`])
         queryClient.setQueryData([`profile/${user.id}`], (old) => ({ ...old, ...payload }))
         return { prevData }
      },
      onSuccess: ({ user }) => {
         toast.success('Profile updated.')
         updateSession({ user })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: [`profile/${user.id}`] })
      },
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
      mutationKey: ['profile/avatar'],
      onSuccess: ({ user, message }) => {
         toast.success(message || 'Profile photo uploaded.')
         updateSession({ user })
         queryClient.invalidateQueries({ queryKey: [`profile/${user?.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}
