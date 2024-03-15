import { Link } from 'react-router-dom'
import { useGetFavouriteBlogsSuspenseQuery } from '~/services/blog.service'

export default function FavouriteBlogList() {
   const { data } = useGetFavouriteBlogsSuspenseQuery()

   const { blogs } = data || {}

   return (
      <ul className='space-y-5 my-5'>
         {blogs &&
            blogs.map(({ id, title, tags }) => (
               <li key={id}>
                  <Link to={`/blogs/${id}`}>
                     <h3 className='text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer'>
                        {title}
                     </h3>
                  </Link>
                  <p className='text-slate-600 text-sm'>{tags}</p>
               </li>
            ))}

         {blogs?.length === 0 && <li className='p-3 bg-gray-900'>No favourite blogs found.</li>}
      </ul>
   )
}
