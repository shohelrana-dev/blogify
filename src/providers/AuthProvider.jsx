import { createContext, useLayoutEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import authReducer from '~/reducers/authReducer'
import { getSession } from '~/utils/session'

export const AuthContext = createContext(null)

const initialState = {
   isAuthenticated: false,
   isChecked: false,
   user: null,
}

export default function AuthProvider({ children }) {
   const [auth, dispatch] = useImmerReducer(authReducer, initialState)

   useLayoutEffect(() => {
      const { user } = getSession()
      if (user) {
         dispatch({ type: 'loggedin', payload: user })
      } else {
         dispatch({ type: 'logout' })
      }
   }, [dispatch])

   return <AuthContext.Provider value={{ auth, dispatch }}>{children}</AuthContext.Provider>
}
