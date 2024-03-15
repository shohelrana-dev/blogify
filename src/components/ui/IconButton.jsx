import cn from '~/utils/cn'

export default function IconButton({ children, className, ...rest }) {
   return (
      <button
         type='button'
         className={cn(
            'p-2 text-white rounded-full transition-colors duration-200 hover:bg-gray-700',
            className
         )}
         {...rest}
      >
         {children}
      </button>
   )
}
