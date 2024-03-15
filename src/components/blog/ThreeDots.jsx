import { useState } from 'react'
import ThreeDotsIcon from '~/assets/icons/3dots.svg?react'
import DeleteIcon from '~/assets/icons/delete.svg?react'
import EditIcon from '~/assets/icons/edit.svg?react'
import useConfirmAlert from '~/hooks/useConfirmAlert'
import { useDeleteBlogMutation } from '~/services/blog.service'
import IconButton from '../ui/IconButton'
import Popover from '../ui/Popover'
import EditBlogModal from './EditBlogModal'

export default function ThreeDots({ blog }) {
   const [isOpen, setIsOpen] = useState(false)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const deleteBlogMutation = useDeleteBlogMutation()
   const confirmAlert = useConfirmAlert()

   function handleEditClick() {
      setIsOpen(false)
      setIsModalOpen(true)
   }

   function handleDeleteClick() {
      confirmAlert({
         title: 'Are you sure to delete the blog?',
         message: 'This action cannot be undone. Make sure to do this action.',
         onConfirm: async () => {
            try {
               await deleteBlogMutation.mutateAsync(blog.id)
               setIsOpen(false)
            } catch (err) {
               console.error(err)
            }
         },
      })
   }

   return (
      <div className='absolute right-0 top-0'>
         <EditBlogModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} blog={blog} />

         <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
            <IconButton>
               <ThreeDotsIcon />
            </IconButton>

            <div className='action-modal-container'>
               <button className='action-menu-item hover:text-lwsGreen' onClick={handleEditClick}>
                  <EditIcon />
                  Edit
               </button>
               <button
                  className='action-menu-item hover:text-red-500'
                  onClick={handleDeleteClick}
                  disabled={deleteBlogMutation.isPending}
               >
                  <DeleteIcon />
                  Delete
               </button>
            </div>
         </Popover>
      </div>
   )
}
