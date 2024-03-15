import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import BlogList from '~/components/blog/BlogList'
import Sidebar from '~/components/home/Sidebar'
import Error from '~/components/ui/Error'
import Loader from '~/components/ui/Loader'
import Transition from '~/components/ui/Transition'
import { APP_NAME } from '~/utils/constants'
import getApiErrorMessage from '~/utils/get-api-error-message'

export default function HomePage() {
   useEffect(() => {
      document.title = `Home | ${APP_NAME}`
   }, [])

   return (
      <Transition>
         <main>
            <section>
               <div className='container'>
                  <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
                     {/* Blog Contents */}
                     <div className='space-y-3 md:col-span-5'>
                        <ErrorBoundary
                           FallbackComponent={({ error }) => <Error>{getApiErrorMessage(error)}</Error>}
                        >
                           <Suspense fallback={<Loader />}>
                              <BlogList />
                           </Suspense>
                        </ErrorBoundary>
                     </div>

                     {/* Sidebar */}
                     <div className='md:col-span-2 h-full w-full space-y-5'>
                        <Sidebar />
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </Transition>
   )
}
