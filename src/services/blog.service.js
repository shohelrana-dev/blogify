import {
   useMutation,
   useQuery,
   useQueryClient,
   useSuspenseInfiniteQuery,
   useSuspenseQuery,
} from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { api } from '~/utils/axios-instance'
import { BLOGS_PER_PAGE } from '~/utils/constants'
import getApiErrorMessage from '~/utils/get-api-error-message'

export default function useInfiniteBlogsQuery() {
   const query = useSuspenseInfiniteQuery({
      queryFn: ({ pageParam }) => api.get(`/blogs`, { params: pageParam }),
      queryKey: ['blogs'],
      initialPageParam: { limit: BLOGS_PER_PAGE, page: 1 },
      getNextPageParam: (lastPage) => {
         if (lastPage?.blogs && lastPage.blogs.length > 0) {
            return { limit: BLOGS_PER_PAGE, page: lastPage.page + 1 }
         }
         return undefined
      },
      refetchInterval: 1000 * 60 * 2,
   })

   const blogs = useMemo(() => {
      return query.data?.pages.reduce((acc, page) => {
         return [...acc, ...page.blogs]
      }, [])
   }, [query.data])

   return { blogs, ...query }
}

export function useGetSingleBlogQuery(blogId) {
   return useQuery({ queryFn: () => api.get(`/blogs/${blogId}`), queryKey: [`blogs/${blogId}`] })
}

export function useCreateBlogMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (formData) => {
         return api.post(`/blogs`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })
      },
      mutationKey: ['blogs/create'],
      onSuccess: ({ message, blog }) => {
         toast.success(message || 'Blog created.')
         queryClient.invalidateQueries({ queryKey: ['blogs'] })
         queryClient.invalidateQueries({ queryKey: [`profile/${blog?.author?.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useUpdateBlogMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (formData) => {
         return api.post(`/blogs`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         })
      },
      mutationKey: ['blogs/update'],
      onSuccess: ({ message, blog }) => {
         toast.success(message || 'Blog updated.')
         queryClient.invalidateQueries({ queryKey: ['blogs'] })
         queryClient.invalidateQueries({ queryKey: [`profile/${blog?.author?.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useDeleteBlogMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (blogId) => api.delete(`/blogs/${blogId}`),
      mutationKey: ['blogs/delete'],
      onSuccess: ({ message }) => {
         toast.success(message || 'Blog deleted.')
         queryClient.invalidateQueries({ queryKey: ['blogs'] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useGetPopularBlogsQuery() {
   return useSuspenseQuery({ queryFn: api.get(`/blogs/popular`), queryKey: [`blogs/popular`] })
}

export function useGetFavouriteBlogsQuery() {
   return useSuspenseQuery({ queryFn: api.get(`/blogs/favourites`), queryKey: [`blogs/favourites`] })
}

export function useToggleFavouriteMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (blogId) => api.patch(`/blogs/${blogId}/favourite`),
      mutationKey: () => [`blogs/${blogId}/favourite`],
      onSuccess: (blog) => {
         toast.success(
            blog.isFavourite ? 'The bolg added to favourite.' : 'Remove favourite for the blog.'
         )
         return Promise.all([
            queryClient.invalidateQueries({ queryKey: ['blogs'] }),
            queryClient.invalidateQueries({ queryKey: [`blogs/${blog.id}`] }),
            queryClient.invalidateQueries({ queryKey: ['blogs/favourite'] }),
         ])
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useToggleLikeMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (blogId) => api.patch(`/blogs/${blogId}/like`),
      mutationKey: (blogId) => [`blogs/${blogId}/like`],
      onSuccess: (blog) => {
         toast.success(blog.isLiked ? 'Blog liked.' : 'Blog unliked')
         return Promise.all([
            queryClient.invalidateQueries({ queryKey: [`blogs`] }),
            queryClient.invalidateQueries({ queryKey: [`blogs/${blog.id}`] }),
         ])
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useCreateCommentMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: ({ blogId, content }) => api.post(`/blogs/${blogId}/comment`, { content }),
      mutationKey: ({ blogId }) => [`blogs/${blogId}/comment/create`],
      onSuccess: (blog) => {
         toast.success('Comment created.')
         return queryClient.invalidateQueries({ queryKey: [`blogs/${blog.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useDeleteCommentMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: ({ blogId, commentId }) => api.delete(`/blogs/${blogId}/comment/${commentId}`),
      mutationKey: ({ commentId }) => [`comment/${commentId}/delete`],
      onSuccess: (blog) => {
         toast.success('Comment deleted.')
         return queryClient.invalidateQueries({ queryKey: [`blogs/${blog.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}
