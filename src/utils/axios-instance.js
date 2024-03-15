import axios from 'axios'
import { SERVER_BASE_URL } from './constants'
import { clearSession, getSession, hasSession, updateSession } from './session'

const { token } = getSession()

export const api = axios.create({
   baseURL: SERVER_BASE_URL,
   headers: {
      common: {
         Authorization: token?.accessToken ? `Bearer ${token?.accessToken}` : '',
         'Content-Type': 'application/json',
      },
   },
   timeout: 30000,
})

api.interceptors.response.use(
   (response) => {
      return response.data
   },
   async (error) => {
      if (error.response?.status === 403) {
         if (!hasSession()) {
            console.log('No session found to generate new access token.')
            return Promise.reject(error)
         }
         try {
            const session = getSession()
            const originalRequest = error.config

            //generate new token using refresh token
            const newToken = await api.post('/auth/refresh-token', {
               refreshToken: session.token.refreshToken,
            })
            console.log(`New Token gerenrated.`)

            //update auth session
            updateSession({ token: newToken })

            //make request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`
            return axios(originalRequest)
         } catch (err) {
            console.log('Session might be expired.')
            //clear session
            clearSession()
            //reload to clear all states
            window.location.reload()
         }
      }
      return Promise.reject(error)
   }
)
