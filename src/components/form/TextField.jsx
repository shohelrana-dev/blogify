import { forwardRef } from 'react'
import ErrorIcon from '~/assets/icons/error.svg?react'
import cn from '~/utils/cn'

const TextField = forwardRef((props, ref) => {
   const {
      label,
      error,
      className,
      wrapperClassName,
      id,
      htmlFor,
      endIcon,
      textarea = false,
      ...rest
   } = props
   const isError = !!error
   const htmlId = id || rest.name || htmlFor

   return (
      <div className={cn('mb-6', wrapperClassName)}>
         {!!label && (
            <label htmlFor={htmlId} className='block mb-2'>
               {label}
            </label>
         )}

         <div className='relative'>
            {textarea ? (
               <textarea
                  id={htmlId}
                  type='text'
                  aria-invalid={isError}
                  className={cn(
                     'w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500',
                     { 'border-danger focus:border-danger pr-3': isError },
                     className
                  )}
                  {...rest}
                  ref={ref}
               />
            ) : (
               <input
                  id={htmlId}
                  type='text'
                  aria-invalid={isError}
                  className={cn(
                     'w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500',
                     { 'border-danger focus:border-danger pr-3': isError },
                     className
                  )}
                  {...rest}
                  ref={ref}
               />
            )}
            {!endIcon && isError && (
               <div className='absolute top-1/2 right-3 -translate-y-1/2 text-xl text-danger'>
                  <ErrorIcon />
               </div>
            )}
            {endIcon && (
               <div className='absolute top-1/2 right-2 -translate-y-1/2 text-xl'>{endIcon}</div>
            )}
         </div>

         {isError && (
            <p role='alert' className='text-sm text-danger'>
               {error.message}
            </p>
         )}
      </div>
   )
})

TextField.displayName = 'TextField'
export default TextField
