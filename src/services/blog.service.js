import {
   useMutation,
   useQuery,
   useQueryClient,
   useSuspenseInfiniteQuery,
   useSuspenseQuery,
} from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuthState from '~/hooks/useAuthState'
import { api } from '~/utils/axios-instance'
import { BLOGS_PER_PAGE } from '~/utils/constants'
import getApiErrorMessage from '~/utils/get-api-error-message'

export default function useInfiniteBlogsSuspenseQuery() {
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
   const { user } = useAuthState()
   return useMutation({
      mutationFn: (blogId) => api.delete(`/blogs/${blogId}`),
      mutationKey: ['blogs/delete'],
      onSuccess: ({ message }) => {
         toast.success(message || 'Blog deleted.')
         queryClient.invalidateQueries({ queryKey: ['blogs'] })
         queryClient.invalidateQueries({ queryKey: [`profile/${user?.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useGetPopularBlogsSuspenseQuery() {
   return useSuspenseQuery({ queryFn: () => api.get(`/blogs/popular`), queryKey: [`blogs/popular`] })
}

export function useGetFavouriteBlogsSuspenseQuery() {
   return useSuspenseQuery({
      queryFn: () => api.get(`/blogs/favourites`),
      queryKey: [`blogs/favourites`],
   })
}

export function useToggleFavouriteMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (blogId) => api.patch(`/blogs/${blogId}/favourite`),
      mutationKey: [`blogs/toggleFavourite`],
      onSuccess: (blog) => {
         toast.success(
            blog.isFavourite ? 'The bolg added to favourite.' : 'Remove favourite for the blog.'
         )
         queryClient.invalidateQueries({ queryKey: ['blogs'] }),
            queryClient.invalidateQueries({ queryKey: [`blogs/${blog.id}`] })
         queryClient.invalidateQueries({ queryKey: ['blogs/favourite'] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useToggleLikeMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: (blogId) => api.post(`/blogs/${blogId}/like`),
      mutationKey: [`blogs/like`],
      onSuccess: (blog) => {
         toast.success(blog.isLiked ? 'Blog liked.' : 'Blog unliked')

         queryClient.invalidateQueries({ queryKey: [`blogs`] })
         queryClient.invalidateQueries({ queryKey: [`blogs/${blog.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}

export function useCreateCommentMutation() {
   const { user } = useAuthState()
   const queryClient = useQueryClient()
   const { blogId } = useParams()
   return useMutation({
      mutationFn: ({ blogId, content }) => api.post(`/blogs/${blogId}/comment`, { content }),
      mutationKey: [`comment/create`],
      onMutate: async ({ blogId, content }) => {
         await queryClient.cancelQueries({ queryKey: [`blogs/${blogId}`] })
         const prevData = queryClient.getQueryData([`blogs/${blogId}`])
         queryClient.setQueryData([`blogs/${blogId}`], (old) => ({
            ...old,
            comments: [...old.comments, { id: Date.now(), content, author: user }],
         }))
         return { prevData }
      },
      onSuccess: () => {
         toast.success('Comment created.')
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: [`blogs/${blogId}`] })
      },
   })
}

export function useDeleteCommentMutation() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: ({ blogId, commentId }) => api.delete(`/blogs/${blogId}/comment/${commentId}`),
      mutationKey: [`comment/delete`],
      onSuccess: (blog) => {
         toast.success('Comment deleted.')
         queryClient.invalidateQueries({ queryKey: [`blogs/${blog.id}`] })
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
   })
}
