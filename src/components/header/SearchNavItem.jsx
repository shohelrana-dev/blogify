import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import searchIcon from '~/assets/icons/search.svg'
import useDebounce from '~/hooks/useDebounce'
import { api } from '~/utils/axios-instance'
import getApiErrorMessage from '~/utils/get-api-error-message'
import { getBlogThumbnailUrl } from '~/utils/image-url'
import truncateString from '~/utils/truncateString'
import Loader from '../ui/Loader'
import Modal from '../ui/Modal'

export default function SearchNavItem() {
   const [isOpen, setIsOpen] = useState(false)
   const {
      data,
      mutateAsync: search,
      error,
      isPending,
   } = useMutation({
      mutationFn: (q) => api.get(`/search`, { params: { q } }),
   })

   const { data: blogs } = data || {}

   const debouncedSearch = useDebounce(async (debouncedSearchText) => {
      try {
         await search(debouncedSearchText)
      } catch (err) {
         toast.error(getApiErrorMessage(err))
      }
   }, 600)

   const openModal = () => setIsOpen(true)
   const closeModal = () => setIsOpen(false)

   function handleChange(e) {
      debouncedSearch(e.target.value)
   }

   return (
      <>
         <li className='flex items-center gap-2 cursor-pointer' onClick={openModal}>
            <img src={searchIcon} alt='Search' />
            <span>Search</span>
         </li>

         <Modal
            open={isOpen}
            onClose={closeModal}
            header={
               <div className='px-1'>
                  <h3 className='font-bold text-xl pl-2 text-slate-400 my-2'>
                     Search for Your Desire Blogs
                  </h3>
                  <input
                     type='text'
                     placeholder='Start Typing to Search'
                     className='w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600'
                     onChange={handleChange}
                  />
                  <h3 className='text-slate-400 font-bold mt-6 ml-2'>Search Results</h3>
               </div>
            }
         >
            <>
               {isPending && <Loader />}
               {!isPending &&
                  blogs &&
                  blogs.map(({ id, thumbnail, title, content }) => (
                     <Link to={`/blogs/${id}`} key={id} onClick={closeModal}>
                        <div className='flex gap-6 py-2' key={id}>
                           {!!thumbnail && (
                              <img
                                 className='h-28 object-contain'
                                 src={getBlogThumbnailUrl(thumbnail)}
                                 alt={title}
                              />
                           )}
                           <div className='mt-2'>
                              <h3 className='text-slate-300 text-xl font-bold'>{title}</h3>
                              <p className='mb-6 text-sm text-slate-500 mt-1'>
                                 {truncateString(content, 300)}
                              </p>
                           </div>
                        </div>
                     </Link>
                  ))}
               {!!error?.response?.data?.message && (
                  <p className='p-3 bg-gray-900'>{error?.response?.data?.message}</p>
               )}
            </>
         </Modal>
      </>
   )
}
