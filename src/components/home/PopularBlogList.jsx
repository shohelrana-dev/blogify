import { Link } from 'react-router-dom'
import { useGetPopularBlogsSuspenseQuery } from '~/services/blog.service'

export default function PopularBlogList() {
   const { data } = useGetPopularBlogsSuspenseQuery()

   const { blogs } = data || {}

   return (
      <ul className='space-y-5 my-5'>
         {blogs.map(({ id, title, author, likes }) => (
            <li key={id}>
               <Link to={`/blogs/${id}`}>
                  <h3 className='text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer'>
                     {title}
                  </h3>
               </Link>
               <p className='text-slate-600 text-sm'>
                  by <Link to={`/profile/${id}`}>{`${author.firstName} ${author.lastName}`}</Link>
                  <span> ·</span> {likes.length} Likes
               </p>
            </li>
         ))}

         {blogs?.length === 0 && <li className='p-3 bg-gray-900'>No popular blogs found.</li>}
      </ul>
   )
}
