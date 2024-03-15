import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthState from '~/hooks/useAuthState'

export default function AuthGuard() {
   const { isAuthenticated } = useAuthState()
   const { pathname } = useLocation()

   if (isAuthenticated) {
      return <Outlet />
   } else {
      return (
         <Navigate
            to={pathname === '/auth/logout' ? '/auth/login' : `/auth/login?callbackUrl=${pathname}`}
         />
      )
   }
}
