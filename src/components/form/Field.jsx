import React from 'react'

export default function Field({ children, error, label, htmlFor }) {
   const id = htmlFor || getChildId(children)

   return (
      <div className='mb-6'>
         <label htmlFor={id} className='block mb-2'>
            {label}
         </label>

         {children}

         {!!error?.message && (
            <p role='alert' className='text-sm text-red-600'>
               {error.message}
            </p>
         )}
      </div>
   )
}

function getChildId(children) {
   const child = React.Children.only(children)

   if ('id' in child?.props) {
      return child.props.id
   }
}
