import { useContext } from 'react'
import { AuthContext } from '~/providers/AuthProvider'

export default function useAuthState() {
   const context = useContext(AuthContext)

   if (!context) {
      throw new Error('Please wrap parent component with AuthProvider.')
   }

   return context.auth
}
