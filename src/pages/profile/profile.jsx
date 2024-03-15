import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BlogCard from '~/components/blog/BlogCard'
import ProfileAvatar from '~/components/profile/ProfileAvatar'
import ProfileBio from '~/components/profile/ProfileBio'
import Error from '~/components/ui/Error'
import PageLoader from '~/components/ui/PageLoader'
import Transition from '~/components/ui/Transition'
import NotFoundPage from '~/pages/not-found'
import { useGetProfileQuery } from '~/services/profile.service'
import { APP_NAME } from '~/utils/constants'

export default function ProfilePage() {
   const { userId } = useParams()
   const { data: user, isLoading, isError, error } = useGetProfileQuery(userId)

   useEffect(() => {
      document.title = `${user?.firstName} ${user?.lastName} | ${APP_NAME}`
   }, [user])

   if (isLoading) return <PageLoader />
   else if (isError && error.response?.status === 404) return <NotFoundPage />
   else if (isError) return <Error>{error.message}</Error>

   //show newst avatar
   user.blogs.map((blog) => {
      blog.author.avatar = user.avatar
   })

   return (
      <Transition>
         <main className='mx-auto max-w-[1020px] py-8'>
            <div className='container'>
               <div className='flex flex-col items-center py-8 text-center'>
                  <ProfileAvatar userId={userId} name={user.firstName} avatar={user.avatar} />

                  <div>
                     <h3 className='text-2xl font-semibold text-white lg:text-[28px]'>
                        {`${user.firstName} ${user.lastName}`}
                     </h3>
                     <p className='leading-[231%] lg:text-lg'>{user.email}</p>
                  </div>

                  <ProfileBio userId={userId} bio={user.bio} />
               </div>

               <h4 className='mt-6 text-xl lg:mt-8 lg:text-2xl'>Your Blogs</h4>
               <div className='my-6 space-y-4'>
                  {user.blogs && user.blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                  {user.blogs?.length === 0 && <p className='p-3 bg-gray-900'>No posts found.</p>}
               </div>
            </div>
         </main>
      </Transition>
   )
}
