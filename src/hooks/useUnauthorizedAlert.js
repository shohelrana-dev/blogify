import { useContext } from 'react'
import { UnauthorizedAlertContext } from '~/providers/UnauthorizedAlertProvider'

export default function useUnauthorizedAlert() {
   const context = useContext(UnauthorizedAlertContext)

   if (!context) {
      throw Error('Please Use UnauthorizedAlertProvider in parent component.')
   }

   return context
}
