import { useEffect, useRef } from 'react'

export default function usePortal(id = 'portalRoot') {
   const rootElemRef = useRef(null)

   useEffect(() => {
      // Create the portal root element if it doesn't exist
      if (!rootElemRef.current) {
         const existingPortalRoot = document.getElementById(id)
         if (!existingPortalRoot) {
            const portalRoot = document.createElement('div')
            portalRoot.setAttribute('id', id)
            document.body.appendChild(portalRoot)
            rootElemRef.current = portalRoot
         } else {
            // Use existing portal root if available
            rootElemRef.current = existingPortalRoot
         }
      }

      // Cleanup function to remove the portal element on unmount
      return () => {
         if (rootElemRef.current) {
            document.body.removeChild(rootElemRef.current)
         }
      }
   }, [id])

   return rootElemRef.current
}
