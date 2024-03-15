import { Link } from 'react-router-dom'
import useAuthState from '~/hooks/useAuthState'
import Avatar from '../ui/Avatar'
import CommentOptions from './CommentOptions'

export default function CommentItem({ comment }) {
   const { user } = useAuthState()
   return (
      <div key={comment.id} className='relative flex items-start space-x-4 my-8'>
         <Avatar name={comment.author.firstName} avatar={comment.author.avatar} />
         <div className='w-full'>
            <Link to={`/profile/${comment.author.id}`}>
               <h5 className='text-slate -500 font-bold'>Saad Hasan</h5>
            </Link>
            <p className='text-slate-300'>{comment.content}</p>
         </div>

         {user && user.id === comment.author.id && <CommentOptions comment={comment} />}
      </div>
   )
}
