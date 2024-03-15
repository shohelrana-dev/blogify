import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '~/components/ui/Button'
import { APP_NAME } from '~/utils/constants'

export default function NotFoundPage() {
   useEffect(() => {
      document.title = `Not Found | ${APP_NAME}`
   }, [])

   return (
      <div className='h-screen-content flex flex-grow items-center justify-center'>
         <div className='rounded-lg bg-gray-900 p-8 text-center shadow-xl flex flex-col items-center'>
            <h1 className='mb-4 text-4xl font-bold'>404 - Not Found</h1>
            <p className='text-gray-300 mb-6'>Oops! The page you are looking for could not be found.</p>
            <Link to='/'>
               <Button className='w-fit'>Go back to Home</Button>
            </Link>
         </div>
      </div>
   )
}
