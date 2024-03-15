import { createContext, useEffect, useLayoutEffect, useRef } from 'react'
import { useImmerReducer } from 'use-immer'
import useUnauthorizedAlert from '~/hooks/useUnauthorizedAlert'
import authReducer from '~/reducers/authReducer'
import { APP_NAME } from '~/utils/constants'
import { getSession } from '~/utils/session'

export const AuthContext = createContext(null)

const initialState = {
   isAuthenticated: false,
   isChecked: false,
   user: null,
}

export default function AuthProvider({ children }) {
   const [auth, dispatch] = useImmerReducer(authReducer, initialState)
   const unauthorizedAlert = useUnauthorizedAlert()
   const showedRef = useRef()

   useLayoutEffect(() => {
      const { user } = getSession()
      if (user) {
         dispatch({ type: 'loggedin', payload: user })
      } else {
         dispatch({ type: 'logout' })
      }
   }, [dispatch])

   useEffect(() => {
      //ensure the alert show for one time
      if (auth.isChecked && !auth.isAuthenticated && !showedRef.current) {
         showedRef.current = true
         setTimeout(() => {
            unauthorizedAlert({
               title: `New to ${APP_NAME}?`,
               message: 'Sign up now to get your own personalized timeline!.',
            })
         }, 8000)
      }
   }, [auth, unauthorizedAlert])

   return <AuthContext.Provider value={{ auth, dispatch }}>{children}</AuthContext.Provider>
}
