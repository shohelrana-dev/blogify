import { Link } from 'react-router-dom'
import useAuthState from '~/hooks/useAuthState'
import { getBlogThumbnailUrl } from '~/utils/image-url'
import truncateString from '~/utils/truncateString'
import Avatar from '../ui/Avatar'
import BlogOptions from './BlogOptions'

export default function BlogCard({ blog }) {
   const { user } = useAuthState()

   const { id, title, content, thumbnail, author, likes, createdAt } = blog
   const { firstName, lastName, avatar } = author
   const isCurrentUserAuthor = user?.id === author.id

   return (
      <Link to={`/blogs/${id}`}>
         <div className='blog-card'>
            {!!thumbnail && (
               <img className='blog-thumb' src={getBlogThumbnailUrl(thumbnail)} alt={title} />
            )}
            <div className='mt-2 relative'>
               <h3 className='text-slate-300 text-xl lg:text-2xl'>{title}</h3>
               <p className='mb-6 text-base text-slate-500 mt-1'>{truncateString(content, 400)}</p>

               {/* Meta Informations */}
               <div className='flex justify-between items-center'>
                  <Link to={`/profile/${author.id}`}>
                     <div className='flex items-center capitalize space-x-2'>
                        <Avatar name={firstName} avatar={avatar} />

                        <div>
                           <h5 className='text-slate-500 text-sm'>{`${firstName} ${lastName}`}</h5>
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
                  </Link>
                  <div className='text-sm px-2 py-1 text-slate-700'>
                     <span>{likes?.length || 0} Likes</span>
                  </div>
               </div>

               {isCurrentUserAuthor && <BlogOptions blog={blog} />}
            </div>
         </div>
      </Link>
   )
}
