import { Navigate, Outlet, useSearchParams } from 'react-router-dom'
import useAuthState from '~/hooks/useAuthState'

export default function GuestGuard() {
   const { isAuthenticated } = useAuthState()
   const [searchParams] = useSearchParams()

   const callbackUrl = searchParams.get('callbackUrl')

   if (!isAuthenticated) {
      return <Outlet />
   } else {
      return <Navigate to={callbackUrl ? callbackUrl : '/'} />
   }
}
