import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import services from '~/services'
import { BLOGS_PER_PAGE } from '~/utils/constants'

export default function useInfiniteBlogsQuery() {
   const query = useSuspenseInfiniteQuery({
      queryFn: ({ pageParam }) => services.blogs.getBlogs(pageParam),
      queryKey: ['blogs'],
      initialPageParam: { limit: BLOGS_PER_PAGE, page: 1 },
      getNextPageParam: (lastPage) => {
         if (lastPage?.blogs && lastPage.blogs.length > 0) {
            return { limit: BLOGS_PER_PAGE, page: lastPage.page + 1 }
         }
         return undefined
      },
      refetchInterval: 60 * 1000,
   })

   const blogs = useMemo(() => {
      return query.data?.pages.reduce((acc, page) => {
         return [...acc, ...page.blogs]
      }, [])
   }, [query.data])

   return { blogs, ...query }
}
