import Avatar from '../ui/Avatar'

export default function CommentItem({ comment }) {
   return (
      <div key={comment.id} className='flex items-start space-x-4 my-8'>
         <Avatar name={comment.author.firstName} avatar={comment.author.avatar} />
         <div className='w-full'>
            <h5 className='text-slate -500 font-bold'>Saad Hasan</h5>
            <p className='text-slate-300'>{comment.content}</p>
         </div>
      </div>
   )
}
