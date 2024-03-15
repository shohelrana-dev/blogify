import { useContext } from 'react'
import { AuthContext } from '~/providers/AuthProvider'

export default function useAuthDispatch() {
   const context = useContext(AuthContext)

   if (!context) {
      throw new Error('Please wrap parent component with AuthProvider.')
   }

   return context.dispatch
}
