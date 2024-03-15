import { useEffect, useRef } from 'react'

export default function useDebounce(callback, delay = 500) {
   const timeoutIdRef = useRef(null)

   useEffect(() => {
      return () => {
         if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
      }
   }, [])

   function debouncedCallback(...args) {
      //clear timeout id first if exists
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)

      timeoutIdRef.current = setTimeout(() => callback(...args), delay)
   }

   return debouncedCallback
}
