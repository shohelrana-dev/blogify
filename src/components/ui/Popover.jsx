import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '~/hooks/usePortal'
import cn from '~/utils/cn'

export default function Popover(props) {
   const portalRoot = usePortal()
   const [isVisible, setIsVisible] = useState(props.isOpen || false)
   const popoverRef = useRef(null)
   const triggerRef = useRef(null)
   const [position, setPosition] = useState({ top: 0, left: 0 })

   const { children, className, placement = 'bottom-right', onOpenChange } = props

   useEffect(() => {
      setIsVisible(props.isOpen)
   }, [props.isOpen])

   useEffect(() => {
      if (!isVisible) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      const newPosition = {}
      const defaultTop = triggerRect.bottom + window.scrollY
      const defaultLeft = triggerRect.left + window.scrollX + triggerRect.width / 2

      switch (placement) {
         case 'bottom-left':
            newPosition.top = defaultTop
            newPosition.left = defaultLeft
            break

         case 'bottom-center':
            newPosition.top = defaultTop
            newPosition.left = defaultLeft - popoverRect.width / 2
            break

         case 'bottom-right':
            newPosition.top = defaultTop
            newPosition.left = defaultLeft - popoverRect.width
            break

         case 'top-left':
            newPosition.top = defaultTop - (popoverRect.height + triggerRect.height)
            newPosition.left = defaultLeft
            break

         case 'top-center':
            newPosition.top = defaultTop - (popoverRect.height + triggerRect.height)
            newPosition.left = defaultLeft - popoverRect.width / 2
            break

         case 'top-right':
            newPosition.top = defaultTop - (popoverRect.height + triggerRect.height)
            newPosition.left = defaultLeft - popoverRect.width
            break
      }

      setPosition(newPosition)
   }, [isVisible, placement])

   function handleClickOutside(event) {
      if (!popoverRef.current || popoverRef.current.contains(event.target)) return
      if (triggerRef.current && triggerRef.current.contains(event.target)) return
      setIsVisible(false)
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   function handleOpen() {
      setIsVisible(!isVisible)
      if (onOpenChange) onOpenChange(!isVisible)
   }

   if (!children || children.length !== 2) {
      throw new Error('Popover must be two children frist one is trigger and second one is content')
   }

   return (
      <>
         <div ref={triggerRef} onClick={handleOpen}>
            {children[0]}
         </div>
         {isVisible &&
            createPortal(
               <div
                  ref={popoverRef}
                  className={cn('z-50 absolute top-0 left-0 w-full max-w-[200px]', className)}
                  style={position}
               >
                  {children[1]}
               </div>,
               portalRoot
            )}
      </>
   )
}
