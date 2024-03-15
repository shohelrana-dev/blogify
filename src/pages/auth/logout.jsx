import { useEffect } from 'react'
import Loader from '~/components/ui/Loader'
import useAuthDispatch from '~/hooks/useAuthDispatch'

export default function LogoutPage() {
   const dispatch = useAuthDispatch()

   useEffect(() => {
      localStorage.removeItem('auth')
      dispatch({ type: 'logout' })
   }, [dispatch])

   return <Loader />
}
