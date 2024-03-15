import { api } from '~/utils/axios-instance'

export async function search(q) {
   const response = await api.get(`/search`, { params: { q } })

   return response.data
}
