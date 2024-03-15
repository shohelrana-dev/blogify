import { createContext, useState } from 'react'
import Button from '~/components/ui/Button'
import ButtonOutlined from '~/components/ui/ButtonOutlined'
import Modal from '~/components/ui/Modal'

export const ConfirmAlertContext = createContext(null)

export default function ConfirmAlertProvider({ children }) {
   const [options, setOptions] = useState({
      title: '',
      confirmButtonLabel: 'Confirm',
      cancelButtonLabel: 'Cancel',
   })
   const [isOpen, setIsOpen] = useState(false)
   const [promise, setPromise] = useState(null)
   const [isLoading, setIsLoading] = useState(false)

   const { onConfirm, onCancel, confirmButtonLabel, cancelButtonLabel, title, message } = options

   const closeModal = () => setIsOpen(false)
   const openModal = () => setIsOpen(true)

   function confirmAlert(options) {
      setOptions((prevState) => ({ ...prevState, ...options }))
      openModal()
      return new Promise((resolve) => {
         setPromise({ resolve })
      })
   }

   async function handleConfirm() {
      if (typeof onConfirm === 'function') {
         setIsLoading(true)

         await onConfirm()
         promise?.resolve(true)
         closeModal()

         setIsLoading(false)
      } else {
         promise?.resolve(true)
         closeModal()
      }
   }

   async function handleCancel() {
      if (typeof onCancel === 'function') {
         await onCancel()
         promise?.resolve(true)
         closeModal()
      } else {
         promise?.resolve(false)
         closeModal()
      }
   }

   return (
      <ConfirmAlertContext.Provider value={confirmAlert}>
         {children}

         <Modal open={isOpen} onOpenChange={setIsOpen} className='max-w-[450px]' hideIcon title={title}>
            <p className='text-white'>{message}</p>
            <div className='flex justify-end gap-2'>
               <ButtonOutlined
                  onClick={handleCancel}
                  disabled={isLoading}
                  size='sm'
                  className='rounded-full'
               >
                  {cancelButtonLabel}
               </ButtonOutlined>
               <Button onClick={handleConfirm} isLoading={isLoading} size='sm' className='rounded-full'>
                  {confirmButtonLabel}
               </Button>
            </div>
         </Modal>
      </ConfirmAlertContext.Provider>
   )
}
