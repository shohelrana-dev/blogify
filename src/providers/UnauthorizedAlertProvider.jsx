import { createContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginIcon from '~/assets/icons/login.svg?react'
import Button from '~/components/ui/Button'
import ButtonOutlined from '~/components/ui/ButtonOutlined'
import Modal from '~/components/ui/Modal'

export const UnauthorizedAlertContext = createContext(null)

export default function UnauthorizedAlertProvider({ children }) {
   const [options, setOptions] = useState()
   const { pathname } = useLocation()
   const [isOpen, setIsOpen] = useState(false)

   const openModal = () => setIsOpen(true)
   const closeModal = () => setIsOpen(false)

   function unauthorizedAlert(options) {
      setOptions(() => options)
      openModal()
   }

   return (
      <UnauthorizedAlertContext.Provider value={unauthorizedAlert}>
         {children}

         <Modal open={isOpen} onOpenChange={setIsOpen} hideIcon>
            <div className='h-full flex flex-col justify-center items-center text-center'>
               <div className='mb-4'>
                  <LoginIcon fontSize='70' color='#fff' />
               </div>

               <div className='mb-4'>
                  <h3 className='text-xl md:text-2xl mb-4'>{options?.title}</h3>
                  <p className='text-gray-300'>{options?.message}</p>
               </div>

               <div className='w-full mt-4'>
                  <Link to={`/auth/login?callbackUrl=${pathname}`}>
                     <Button fullWidth onClick={closeModal} className='mb-3 rounded-full'>
                        Log in
                     </Button>
                  </Link>
                  <Link to={`/auth/signup`}>
                     <ButtonOutlined fullWidth onClick={closeModal} className='rounded-full'>
                        Sign up
                     </ButtonOutlined>
                  </Link>
               </div>
            </div>
         </Modal>
      </UnauthorizedAlertContext.Provider>
   )
}
