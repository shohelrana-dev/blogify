import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ThreeDotsIcon from '~/assets/icons/3dots.svg?react'
import DeleteIcon from '~/assets/icons/delete.svg?react'
import useConfirmAlert from '~/hooks/useConfirmAlert'
import { useDeleteCommentMutation } from '~/services/blog.service'
import IconButton from '../ui/IconButton'
import Popover from '../ui/Popover'

export default function CommentOptions({ comment }) {
   const { blogId } = useParams()
   const [isOpen, setIsOpen] = useState(false)
   const deleteCommentMutation = useDeleteCommentMutation()
   const confirmAlert = useConfirmAlert()

   function handleDeleteClick() {
      confirmAlert({
         title: 'Are you sure to delete the comment?',
         message: 'This action cannot be undone. Make sure to do this action.',
         onConfirm: () => {
            setIsOpen(false)
            return deleteCommentMutation.mutateAsync({ blogId, commentId: comment.id })
         },
      })
   }

   return (
      <div className='absolute right-0 top-0'>
         <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
            <IconButton>
               <ThreeDotsIcon />
            </IconButton>

            <div className='action-modal-container'>
               <button
                  className='action-menu-item hover:text-red-500'
                  onClick={handleDeleteClick}
                  disabled={deleteCommentMutation.isPending}
               >
                  <DeleteIcon />
                  Delete
               </button>
            </div>
         </Popover>
      </div>
   )
}
