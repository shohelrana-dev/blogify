import cn from '~/utils/cn'

export default function Loader(props) {
   const { wrapperClassName, size = 'md', isLoading = true, disableText, className } = props
   const sizeClasses = {
      xs: 'size-4',
      sm: 'size-5',
      md: 'size-8',
      lg: 'size-10',
   }

   if (!isLoading) return null

   return (
      <div
         role='spinner'
         className={cn('flex flex-col items-center justify-center min-h-24', wrapperClassName)}
      >
         <span
            className={cn(
               'animate-spin duration-500 border-4 border-gray-200 border-t-indigo-600 rounded-full',
               { 'border-2': size === 'xs' || size === 'sm' },
               sizeClasses[size],
               className
            )}
         />

         {!disableText && <span className='text-gray-500 text-sm mt-2'>Loading...</span>}
      </div>
   )
}
