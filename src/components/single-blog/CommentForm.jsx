import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuthState from '~/hooks/useAuthState'
import useUnauthorizedAlert from '~/hooks/useUnauthorizedAlert'
import { useCreateCommentMutation } from '~/services/blog.service'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

export default function CommentForm() {
   const { blogId } = useParams()
   const { user: currentUser, isAuthenticated } = useAuthState()
   const [commentsText, setCommentText] = useState('')
   const unauthorizedAlert = useUnauthorizedAlert()
   const createCommentMutation = useCreateCommentMutation()

   async function handleSubmitComment(e) {
      e.preventDefault()
      if (!isAuthenticated) {
         return unauthorizedAlert({
            title: 'Login or Signup to Create Comment.',
            message:
               'Writing comment on posts requires authentication. Please take a moment to either sign in with your existing account or create a new one.',
         })
      }
      if (!commentsText) return

      try {
         await createCommentMutation.mutateAsync({ blogId, content: commentsText })
         setCommentText('')
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <form className='flex space-x-4' onSubmit={handleSubmitComment}>
         {isAuthenticated && <Avatar name={currentUser.firstName} avatar={currentUser.avatar} />}
         <div className='w-full'>
            <textarea
               className='w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none'
               placeholder='Write a comment'
               value={commentsText}
               onChange={(e) => setCommentText(e.target.value)}
            />
            <div className='flex justify-end mt-4'>
               <Button type='submit' isLoading={createCommentMutation.isPending}>
                  Comment
               </Button>
            </div>
         </div>
      </form>
   )
}
