import { api } from './axios-instance'
import { SESSION_KEY } from './constants'

export function getSession() {
   return JSON.parse(localStorage.getItem(SESSION_KEY)) || {}
}
export function setSession(session) {
   if (!session?.user || !session?.token?.accessToken || !session?.token?.refreshToken) {
      throw new Error('Session format is incorrect.')
   }
   api.defaults.headers.common['Authorization'] = `Bearer ${session?.token?.accessToken}`
   localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}
export function clearSession() {
   localStorage.removeItem(SESSION_KEY)
}
