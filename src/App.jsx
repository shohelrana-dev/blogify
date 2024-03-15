import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import '~/assets/styles/main.css'
import AuthGuard from '~/components/AuthGuard'
import Footer from '~/components/Footer'
import GuestGuard from '~/components/GuestGuard'
import Header from '~/components/header/Header'
import PageLoader from './components/ui/PageLoader'

const ErrorPage = lazy(() => import('~/pages/error'))
const NotFoundPage = lazy(() => import('~/pages/not-found'))
const LogoutPage = lazy(() => import('~/pages/auth/logout'))
const ProfilePage = lazy(() => import('~/pages/profile/profile'))
const LoginPage = lazy(() => import('~/pages/auth/login'))
const SignupPage = lazy(() => import('~/pages/auth/signup'))
const HomePage = lazy(() => import('~/pages/home'))
const CreateBlogPage = lazy(() => import('~/pages/create-blog'))
const SingleBlogPage = lazy(() => import('~/pages/single-blog'))
const TestPage = lazy(() => import('~/pages/test-page'))

export default function App() {
   return (
      <>
         <Header />

         <ErrorBoundary FallbackComponent={ErrorPage}>
            <Suspense fallback={<PageLoader />}>
               <Routes>
                  {/* Public routes */}
                  <Route path='/' exact element={<HomePage />} />
                  <Route path='/profile/:userId' element={<ProfilePage />} />
                  <Route path='/blogs/:blogId' element={<SingleBlogPage />} />
                  <Route path='/test-page' element={<TestPage />} />

                  {/* Authenticted Routes */}
                  <Route element={<AuthGuard />}>
                     <Route path='/auth/logout' element={<LogoutPage />} />
                     <Route path='/blogs/create' element={<CreateBlogPage />} />
                  </Route>

                  {/* Guest Routes */}
                  <Route element={<GuestGuard />}>
                     <Route path='/auth/login' element={<LoginPage />} />
                     <Route path='/auth/signup' element={<SignupPage />} />
                  </Route>

                  {/* Not found page */}
                  <Route path='*' element={<NotFoundPage />} />
               </Routes>
            </Suspense>
         </ErrorBoundary>

         <Footer />
      </>
   )
}
