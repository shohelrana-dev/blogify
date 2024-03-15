import axios from 'axios'
import { SERVER_BASE_URL } from './constants'
import { clearSession, getSession, setSession } from './session'

const { token } = getSession()

export const api = axios.create({
   baseURL: SERVER_BASE_URL,
   headers: {
      common: {
         Authorization: `Bearer ${token?.accessToken}`,
         'Content-Type': 'application/json',
      },
   },
   timeout: 30000,
})

api.interceptors.response.use(
   (response) => response.data,
   async (error) => {
      if (error.response?.status === 403) {
         const session = getSession()
         if (!session.token?.refreshToken) {
            console.log('No session found to generate new access token.')
            return Promise.reject(error)
         }
         try {
            const originalRequest = error.config

            //generate new token using refresh token
            const newToken = await api.post('/auth/refresh-token', {
               refreshToken: session.token.refreshToken,
            })
            console.log(`New Token gerenrated.`)

            //update auth session
            setSession({ user: session.user, token: newToken })

            //make request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`
            return axios(originalRequest)
         } catch (err) {
            console.log('Session might be expired.')
            //clear session
            clearSession()
            //promise reject
            return Promise.reject(error)
         }
      }
      return Promise.reject(error)
   }
)
