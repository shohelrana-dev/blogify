import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import GalleryIcon from '~/assets/icons/gallery.svg?react'
import useSelectFile from '~/hooks/useSelectFIle'
import { useUpdateBlogMutation } from '~/services/blog.service'
import { getBlogThumbnailUrl } from '~/utils/image-url'
import TextField from '../form/TextField'
import Button from '../ui/Button'
import ButtonOutlined from '../ui/ButtonOutlined'
import Modal from '../ui/Modal'

export default function EditBlogModal({ isOpen, onOpenChange, blog }) {
   const navigate = useNavigate()
   const { register, handleSubmit, formState, reset } = useForm({
      defaultValues: { title: blog.title, tags: blog.tags, content: blog.content },
   })
   const { inputRef, handleClick, handleChange, selectedFile, removeSelectedFile } = useSelectFile()
   const updateBlogMutation = useUpdateBlogMutation()

   const { errors } = formState

   async function handleUpdateBlog(payload) {
      const formData = new FormData()
      formData.append('id', blog.id)
      if (selectedFile) formData.append('thumbnail', selectedFile)
      formData.append('title', payload.title)
      formData.append('tags', payload.tags)
      formData.append('content', payload.content)

      try {
         const data = await updateBlogMutation.mutateAsync(formData)
         reset()
         onOpenChange(false)
         navigate(`/blogs/${data.id}`)
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <Modal open={isOpen} onOpenChange={onOpenChange}>
         <form className='createBlog' onSubmit={handleSubmit(handleUpdateBlog)}>
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
            ) : !!blog.thumbnail && typeof blog.thumbnail === 'string' ? (
               <div className='relative max-w-[350px] mx-auto'>
                  <img
                     src={getBlogThumbnailUrl(blog.thumbnail)}
                     alt='Blog image'
                     className='w-full max-h-[250px] object-cover'
                  />
                  <div className='flex flex-wrap gap-1 justify-center mt-1'>
                     <ButtonOutlined size='sm' className='rounded-full' onClick={handleClick}>
                        Change Image
                     </ButtonOutlined>
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
                     minLength: { value: 30, message: 'Blog content must be atleast 30 characters.' },
                  })}
               />
               {!!errors.content && (
                  <p role='alert' className='text-sm text-danger'>
                     {errors.content.message}
                  </p>
               )}
            </div>

            <Button type='submit' isLoading={updateBlogMutation.isPending}>
               Update Blog
            </Button>
         </form>
      </Modal>
   )
}
