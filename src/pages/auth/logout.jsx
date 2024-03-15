import { useEffect } from 'react'
import Loader from '~/components/ui/Loader'
import useAuthDispatch from '~/hooks/useAuthDispatch'
import { clearSession } from '~/utils/session'

export default function LogoutPage() {
   const dispatch = useAuthDispatch()

   useEffect(() => {
      dispatch({ type: 'logout' })
      clearSession()
   })

   return <Loader />
}
