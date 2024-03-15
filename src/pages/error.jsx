import { useEffect } from 'react'
import ErrorIcon from '~/assets/icons/error.svg?react'
import Button from '~/components/ui/Button'
import { APP_NAME } from '~/utils/constants'

export default function ErrorPage({ error, resetErrorBoundary }) {
   useEffect(() => {
      document.title = `${error?.message || 'Error'} | ${APP_NAME}`
   }, [error])

   return (
      <div className='w-full h-screen-content flex flex-grow items-center justify-center'>
         <div className='rounded-lg bg-gray-900 p-8 text-center shadow-xl flex flex-col items-center w-[400px] max-w-full'>
            <h1 className='mb-4 text-4xl font-bold'>
               <ErrorIcon />
            </h1>
            <p className='text-gray-300 mb-6'>An error has occured: {error.message}.</p>
            <Button className='w-fit' onClick={() => resetErrorBoundary()}>
               Try Reload
            </Button>
         </div>
      </div>
   )
}
