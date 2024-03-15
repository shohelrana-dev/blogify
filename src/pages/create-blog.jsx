import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import GalleryIcon from '~/assets/icons/gallery.svg?react'
import TextField from '~/components/form/TextField'
import Button from '~/components/ui/Button'
import ButtonOutlined from '~/components/ui/ButtonOutlined'
import Transition from '~/components/ui/Transition'
import useSelectFile from '~/hooks/useSelectFIle'
import { useCreateBlogMutation } from '~/services/blog.service'
import { APP_NAME } from '~/utils/constants'

export default function CreateBLogPage() {
   const { register, handleSubmit, formState, reset } = useForm()
   const { inputRef, handleClick, handleChange, selectedFile, removeSelectedFile } = useSelectFile()
   const { isPending, mutateAsync: createBlogMutate } = useCreateBlogMutation()
   const navigate = useNavigate()

   const { errors } = formState

   useEffect(() => {
      document.title = `Create Blog | ${APP_NAME}`
   }, [])

   async function handleCreateBlog(payload) {
      const formData = new FormData()
      if (selectedFile) formData.append('thumbnail', selectedFile)
      formData.append('title', payload.title)
      formData.append('tags', payload.tags)
      formData.append('content', payload.content)
      try {
         const data = await createBlogMutate(formData)
         reset()
         navigate(`/blogs/${data?.blog?.id || data?.data?.blog?.id}`)
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <Transition>
         <main>
            <section>
               <div className='container'>
                  <form className='createBlog' onSubmit={handleSubmit(handleCreateBlog)}>
                     <input ref={inputRef} type='file' onChange={handleChange} hidden />
                     {selectedFile ? (
                        <div className='relative max-w-[350px] mx-auto'>
                           <img
                              src={URL.createObjectURL(selectedFile)}
                              alt='Blog image'
                              className='w-full max-h-[250px] object-cover'
                           />
                           <div className='flex flex-wrap gap-1 justify-center mt-1'>
                              <ButtonOutlined size='sm' className='rounded-full' onClick={handleClick}>
                                 Change Image
                              </ButtonOutlined>
                              <Button size='sm' className='rounded-full' onClick={removeSelectedFile}>
                                 Remove Image
                              </Button>
                           </div>
                        </div>
                     ) : (
                        <div className='grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4'>
                           <div
                              className='flex items-center gap-4 hover:scale-110 transition-all cursor-pointer select-none'
                              onClick={handleClick}
                           >
                              <GalleryIcon fontSize='30' />
                              <p>Upload Image</p>
                           </div>
                        </div>
                     )}

                     <TextField
                        placeholder='Enter your blog title'
                        error={errors.title}
                        {...register('title', { required: 'Title is required.' })}
                     />

                     <TextField
                        placeholder='Your Comma Separated Tags Ex. JavaScript, React, Node, Express,'
                        error={errors.tags}
                        {...register('tags', { required: 'Tags is required.' })}
                     />

                     <div className='mb-6'>
                        <textarea
                           placeholder='Write your blog content'
                           rows={6}
                           {...register('content', {
                              required: 'Content is required.',
                              minLength: {
                                 value: 30,
                                 message: 'Blog content must be atleast 30 characters.',
                              },
                           })}
                        />
                        {!!errors.content && (
                           <p role='alert' className='text-sm text-danger'>
                              {errors.content.message}
                           </p>
                        )}
                     </div>

                     <Button type='submit' isLoading={isPending}>
                        Create Blog
                     </Button>
                  </form>
               </div>
            </section>
         </main>
      </Transition>
   )
}
