import cn from '~/utils/cn'
import Loader from './Loader'

export default function Button(props) {
   const { children, className, isLoading = false, fullWidth, size = 'md', ...rest } = props

   return (
      <button
         type='button'
         className={cn(
            'min-w-24 px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 flex justify-center items-center gap-[6px] disabled:bg-gray-800 disabled:text-gray-500',
            { 'w-full': fullWidth },
            { 'py-2 text-sm': size === 'sm' },
            className
         )}
         disabled={isLoading}
         {...rest}
      >
         <Loader disableText wrapperClassName='min-h-[auto]' size='sm' isLoading={isLoading} />
         <span>{children}</span>
      </button>
   )
}
