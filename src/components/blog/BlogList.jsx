import useInfiniteBlogsQuery from '~/hooks/useInfiniteBlogsQuery'
import InfiniteScroll from '../InfiniteScroll'
import Loader from '../ui/Loader'
import BlogCard from './BlogCard'

export default function BlogList() {
   const { blogs, hasNextPage, fetchNextPage } = useInfiniteBlogsQuery()

   return (
      <>
         <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage} loader={<Loader />}>
            {blogs.map((blog) => (
               <BlogCard key={blog.id} blog={blog} />
            ))}
         </InfiniteScroll>

         {!hasNextPage && <p className='p-3 my-4 bg-gray-900'>No more blogs.</p>}

         {blogs?.length === 0 && <p className='p-3 my-4 bg-gray-900'>No blogs found.</p>}
      </>
   )
}
