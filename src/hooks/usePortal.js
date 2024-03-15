import { useEffect, useRef } from 'react'

export default function usePortal() {
   const portalRootRef = useRef(null)

   useEffect(() => {
      // Create the portal root element if it doesn't exist
      if (!portalRootRef.current) {
         const existingPortalRoot = document.getElementById('portalRoot')
         if (!existingPortalRoot) {
            const portalRoot = document.createElement('div')
            portalRoot.setAttribute('id', 'portalRoot')
            document.body.appendChild(portalRoot)
            portalRootRef.current = portalRoot
         } else {
            // Use existing portal root if available
            portalRootRef.current = existingPortalRoot
         }
      }
   }, [])

   return portalRootRef.current
}
