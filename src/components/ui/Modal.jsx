import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import closeIcon from '~/assets/icons/close.svg'
import usePortal from '~/hooks/usePortal'
import cn from '~/utils/cn'
import IconButton from './IconButton'

const classes = {
   container: 'z-[999] fixed w-screen h-screen top-0 left-0 flex justify-center items-center',
   darkOverlay:
      'absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm',
   modal: 'relative z-[1000] w-[95%] max-w-[800px] mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10 max-h-[90vh] flex flex-col overflow-hidden',
   close: 'absolute right-1 top-1 p-1',
   content: 'my-2 grow overflow-y-scroll',
}

export default function Modal(props) {
   const portalRoot = usePortal()
   const { title, header, footer, children, open, className, onOpenChange, onClose, hideIcon } = props

   useEffect(() => {
      if (open) {
         document.body.style.overflow = 'hidden'
      }

      return () => (document.body.style.overflow = 'auto')
   }, [open])

   if (!open) return null

   function handleClose() {
      if (onOpenChange) onOpenChange(false)
      if (onClose) onClose()
   }

   return createPortal(
      <div className={classes.container}>
         <motion.div
            className={classes.darkOverlay}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
         />

         <motion.div
            role='dialog'
            aria-modal='true'
            className={cn(classes.modal, className)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
         >
            {!hideIcon && (
               <IconButton className={classes.close} onClick={handleClose}>
                  <img src={closeIcon} alt='Close' className='w-7 h-7' />
               </IconButton>
            )}

            {(!!header || !!title) && (
               <header className='border-none mb-0'>
                  {!!header && header}
                  {!!title && <h3 className='font-bold text-xl text-white my-2'>{title}</h3>}
               </header>
            )}

            <div className={classes.content}>{children}</div>

            {!!footer && <footer>{footer}</footer>}
         </motion.div>
      </div>,
      portalRoot
   )
}
