import { useQuery, useQueryClient } from '@tanstack/react-query'
import BlogCard from '~/components/blog/BlogCard'
import Button from '~/components/ui/Button'
import Loader from '~/components/ui/Loader'
import useInfiniteBlogsQuery from '~/hooks/useInfiniteBlogsQuery'
import { getBlogById } from '~/services/blog.service'

export default function TestPage() {
   const { blogs, isLoading } = useInfiniteBlogsQuery()
   const { data } = useQuery({
      queryFn: () => getBlogById('7c12b4b48531bcc995ae'),
      queryKey: ['blogs/7c12b4b48531bcc995ae'],
   })
   const queryClient = useQueryClient()

   function handleClick() {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.invalidateQueries({ queryKey: [`blogs/7c12b4b48531bcc995ae`] })
   }
   console.log(data)
   if (isLoading) return <Loader />

   return (
      <div>
         <Button onClick={handleClick}>Revalidate Blogs</Button>
         {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
         ))}
      </div>
   )
}
