import { useState } from 'react'
import EditIcon from '~/assets/icons/edit.svg?react'
import GalleryIcon from '~/assets/icons/gallery.svg?react'
import useAuthState from '~/hooks/useAuthState'
import useSelectFile from '~/hooks/useSelectFIle'
import { useUploadAvatarMutation } from '~/services/profile.service'
import { getAvatarUrl } from '~/utils/image-url'
import Button from '../ui/Button'
import ButtonOutlined from '../ui/ButtonOutlined'
import IconButton from '../ui/IconButton'
import Modal from '../ui/Modal'

export default function ProfileAvatar({ userId, name, avatar }) {
   const { user: currentUser, isAuthenticated } = useAuthState()
   const [isOpen, setIsOpen] = useState(false)
   const { inputRef, handleClick, handleChange, selectedFile, removeSelectedFile } = useSelectFile()
   const uploadAvatarMutation = useUploadAvatarMutation()

   const openModal = () => setIsOpen(true)
   const closeModal = () => {
      setIsOpen(false)
      removeSelectedFile()
   }

   async function handleSave() {
      const formData = new FormData()
      formData.append('avatar', selectedFile)

      try {
         await uploadAvatarMutation.mutateAsync(formData)
         closeModal()
      } catch (err) {
         console.error(err)
      }
   }

   const isCurrentUserProfile = isAuthenticated && userId === currentUser.id

   return (
      <div className='relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]'>
         {avatar ? (
            <img
               src={getAvatarUrl(avatar)}
               alt={name}
               className='rounded-full object-cover  h-[120px] w-[120px]'
            />
         ) : (
            <div className='w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full'>
               <span className=''>{name[0].toUpperCase()}</span>
            </div>
         )}

         {isCurrentUserProfile && (
            <IconButton className='bg-gray-800 absolute bottom-0 right-0' onClick={openModal}>
               <EditIcon />
            </IconButton>
         )}

         <Modal open={isOpen} onClose={closeModal} className='max-w-[600px]'>
            <input type='file' ref={inputRef} onChange={handleChange} hidden />
            {selectedFile ? (
               <div className='relative flex flex-col items-center'>
                  <h3 className='text-2xl font-bold mb-2'>Looking good!</h3>
                  <p className='mb-3 text-center'>
                     This photo will be added to your profile. It will also be seen by hosts or guest, so
                     be sure it doesn’t include any personal or sensitive info.
                  </p>
                  <img
                     src={URL.createObjectURL(selectedFile)}
                     alt='Blog image'
                     className='w-[250px] h-[250px] rounded-full object-cover'
                  />
                  <div className='flex flex-wrap gap-1 justify-center mt-6'>
                     <ButtonOutlined size='sm' className='rounded-full' onClick={handleClick}>
                        Change Photo
                     </ButtonOutlined>
                     <Button size='sm' className='rounded-full' onClick={handleSave}>
                        Save Profile Photo
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
                     <p>Upload Photo</p>
                  </div>
               </div>
            )}
         </Modal>
      </div>
   )
}
