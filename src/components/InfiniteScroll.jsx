import { useEffect, useRef } from 'react'

export default function InfiniteScroll({ children, loader, loadMore, hasMore }) {
   const loaderRef = useRef()

   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting) {
            loadMore()
         }
      })
      if (loaderRef.current) {
         observer.observe(loaderRef.current)
      }

      //cleanup
      return () => observer.disconnect()
   }, [loadMore])

   return (
      <>
         {children}

         {hasMore && <span ref={loaderRef}>{loader}</span>}
      </>
   )
}
