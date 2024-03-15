import { api } from './axios-instance'
import { SESSION_KEY } from './constants'

export function getSession() {
   return JSON.parse(localStorage.getItem(SESSION_KEY)) || {}
}

export function setSession(session) {
   if (
      'user' in session &&
      'token' in session &&
      'accessToken' in session.token &&
      'refreshToken' in session.token
   ) {
      api.defaults.headers.common['Authorization'] = `Bearer ${session?.token?.accessToken}`
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
   } else {
      throw new Error('Session format is incorrect.')
   }
}

export function updateSession(session) {
   if (!('user' in session) && !('token' in session)) {
      throw new Error('Session format is incorrect.')
   }
   if (session.token?.accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${session.token.accessToken}`
   }
   const prevSession = getSession()
   localStorage.setItem(SESSION_KEY, JSON.stringify({ ...prevSession, ...session }))
}

export function hasSession() {
   const session = getSession()
   if ('user' in session && 'token' in session) {
      return true
   }
   false
}

export function clearSession() {
   localStorage.removeItem(SESSION_KEY)
   if (api.defaults.headers.common['Authorization']) {
      delete api.defaults.headers.common['Authorization']
   }
}
