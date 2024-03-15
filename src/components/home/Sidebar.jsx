import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import useAuthState from '~/hooks/useAuthState'
import getApiErrorMessage from '~/utils/get-api-error-message'
import Error from '../ui/Error'
import Loader from '../ui/Loader'
import FavouriteBlogList from './FavouriteBlogList'
import PopularBlogList from './PopularBlogList'

export default function Sidebar() {
   const { isAuthenticated } = useAuthState()

   return (
      <>
         <div className='sidebar-card'>
            <h3 className='text-slate-300 text-xl lg:text-2xl font-semibold'>Most Popular 👍️</h3>

            <ErrorBoundary FallbackComponent={({ error }) => <Error>{getApiErrorMessage(error)}</Error>}>
               <Suspense fallback={<Loader />}>
                  <PopularBlogList />
               </Suspense>
            </ErrorBoundary>
         </div>

         {isAuthenticated && (
            <div className='sidebar-card'>
               <h3 className='text-slate-300 text-xl lg:text-2xl font-semibold'>Your Favourites ❤️</h3>

               <ErrorBoundary
                  FallbackComponent={({ error }) => <Error>{getApiErrorMessage(error)}</Error>}
               >
                  <Suspense fallback={<Loader />}>
                     <FavouriteBlogList />
                  </Suspense>
               </ErrorBoundary>
            </div>
         )}
      </>
   )
}
