import { Link } from 'react-router-dom'
import useAuthState from '~/hooks/useAuthState'
import { getBlogThumbnailUrl } from '~/utils/image-url'
import Avatar from '../ui/Avatar'
import ThreeDots from './ThreeDots'

export default function BlogCard({ blog }) {
   const { user } = useAuthState()

   const { id, title, content, thumbnail, author, likes, createdAt } = blog
   const { firstName, lastName, avatar } = author
   const isCurrentUserAuthor = user?.id === author.id

   return (
      <div className='blog-card'>
         {!!thumbnail && (
            <Link to={`/blogs/${id}`}>
               <img className='blog-thumb' src={getBlogThumbnailUrl(thumbnail)} alt={title} />
            </Link>
         )}
         <div className='mt-2 relative'>
            <Link to={`/blogs/${id}`}></Link>
            <h3 className='text-slate-300 text-xl lg:text-2xl'>
               <Link to={`/blogs/${id}`}></Link>
               <Link to={`/blogs/${id}`}>{title}</Link>
            </h3>
            <p className='mb-6 text-base text-slate-500 mt-1'>{content}</p>

            {/* Meta Informations */}
            <div className='flex justify-between items-center'>
               <div className='flex items-center capitalize space-x-2'>
                  <Avatar name={firstName} avatar={avatar} />

                  <div>
                     <h5 className='text-slate-500 text-sm'>
                        <Link to={`/profile/${author.id}`}>{`${firstName} ${lastName}`}</Link>
                     </h5>
                     <div className='flex items-center text-xs text-slate-700'>
                        <span>
                           {new Date(createdAt).toLocaleDateString('en-us', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                           })}
                        </span>
                     </div>
                  </div>
               </div>
               <div className='text-sm px-2 py-1 text-slate-700'>
                  <span>{likes?.length || 0} Likes</span>
               </div>
            </div>

            {isCurrentUserAuthor && <ThreeDots blog={blog} />}
         </div>
      </div>
   )
}
