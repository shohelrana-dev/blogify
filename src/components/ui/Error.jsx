import ErrorIcon from '~/assets/icons/error.svg?react'

export default function Error({ children, isError = true }) {
   if (!isError) return null

   return (
      <div className='flex items-center gap-3 rounded-md text-white bg-[#561E2A] p-3'>
         <span className='text-xl'>
            <ErrorIcon />
         </span>
         {children}
      </div>
   )
}
