import cn from '~/utils/cn'
import Button from './Button'

export default function ButtonOutlined({ children, className, ...rest }) {
   return (
      <Button
         className={cn('bg-transparent border border-gray-600 hover:bg-gray-800', className)}
         {...rest}
      >
         {children}
      </Button>
   )
}
