import { api } from '~/utils/axios-instance'

export async function getUserById(id) {
   const response = await api.get(`/users/${id}`)

   return response.data
}
