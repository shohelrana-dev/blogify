import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentForm from '~/components/single-blog/CommentForm'
import CommentItem from '~/components/single-blog/CommentItem'
import FloatingActions from '~/components/single-blog/FloatingActions'
import Avatar from '~/components/ui/Avatar'
import Error from '~/components/ui/Error'
import PageLoader from '~/components/ui/PageLoader'
import Transition from '~/components/ui/Transition'
import { useGetSingleBlogQuery } from '~/services/blog.service'
import { APP_NAME } from '~/utils/constants'
import { getBlogThumbnailUrl } from '~/utils/image-url'
import NotFoundPage from './not-found'

export default function SingleBlogPage() {
   const { blogId } = useParams()
   const { data: blog, isLoading, isError, error } = useGetSingleBlogQuery(blogId)

   useEffect(() => {
      document.title = `${blog?.title} | ${APP_NAME}`
   }, [blog])

   if (isLoading) return <PageLoader />
   else if (isError && error.response?.status === 404) return <NotFoundPage />
   else if (isError) return <Error>{error.message}</Error>

   const { title, author, createdAt, likes, thumbnail, tags, content, comments } = blog
   const { firstName, lastName, avatar } = author || {}

   return (
      <Transition>
         <main>
            <section>
               <div className='container text-center py-8'>
                  <h1 className='font-bold text-3xl md:text-5xl'>{title}</h1>

                  <div className='flex justify-center items-center my-4 gap-4'>
                     <div className='flex items-center capitalize space-x-2'>
                        <Avatar name={firstName} avatar={avatar} />
                        <Link to={`/profile/${author.id}`}>
                           <h5 className='text-slate-500 text-sm'>{`${firstName} ${lastName}`}</h5>
                        </Link>
                     </div>
                     <span className='text-sm text-slate-700 dot'>
                        {new Date(createdAt).toLocaleDateString('en-us', {
                           month: 'short',
                           day: '2-digit',
                           year: 'numeric',
                        })}
                     </span>
                     <span className='text-sm text-slate-700 dot'>{likes?.length || 0} Likes</span>
                  </div>
                  {!!thumbnail && (
                     <img
                        className='mx-auto w-full md:w-8/12 object-cover h-80 md:h-96'
                        src={getBlogThumbnailUrl(thumbnail)}
                        alt={title}
                     />
                  )}

                  {/* Tags */}
                  <ul className='tags'>
                     {tags.split(',').map((tag) => (
                        <li key={tag}>{tag}</li>
                     ))}
                  </ul>

                  {/* Content */}
                  <div
                     className='mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left'
                     dangerouslySetInnerHTML={{ __html: content }}
                  />
               </div>
            </section>
            {/* End Blogs */}

            {/* Begin Comments */}
            <section id='comments'>
               <div className='mx-auto w-full md:w-10/12 container'>
                  <h2 className='text-3xl font-bold my-8'>Comments ({comments?.length || 0})</h2>

                  <CommentForm />

                  {comments &&
                     comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}

                  {comments?.length === 0 && <p className='p-3 mt-3 bg-gray-900'>No comments found.</p>}
               </div>
            </section>

            <FloatingActions blog={blog} />
         </main>
      </Transition>
   )
}
