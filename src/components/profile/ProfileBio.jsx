import { useState } from 'react'
import EditIcon from '~/assets/icons/edit.svg?react'
import useAuthState from '~/hooks/useAuthState'
import { useUpdateProfileMutation } from '~/services/profile.service'
import TextField from '../form/TextField'
import Button from '../ui/Button'
import ButtonOutlined from '../ui/ButtonOutlined'
import IconButton from '../ui/IconButton'

export default function ProfileBio({ userId, bio }) {
   const { user: currentUser, isAuthenticated } = useAuthState()
   const [isEditMode, setIsEditMode] = useState(false)
   const [inputText, setInputText] = useState(bio)
   const uploadBioMutation = useUpdateProfileMutation()

   const toggleEditMode = () => {
      setIsEditMode(!isEditMode)
      setInputText(bio)
   }

   async function handleSubmit(e) {
      e.preventDefault()
      if (!inputText) return

      try {
         await uploadBioMutation.mutateAsync({ bio: inputText })
         toggleEditMode()
      } catch (err) {
         console.error(err)
      }
   }

   const isCurrentUserProfile = isAuthenticated && userId === currentUser.id

   return (
      <>
         <div className='mt-4 flex items-start gap-2 lg:mt-6 w-full'>
            <div className='flex-1'>
               {isEditMode ? (
                  <form onSubmit={handleSubmit} className='w-full'>
                     <TextField
                        placeholder='Bio'
                        textarea
                        rows={6}
                        wrapperClassName='mb-0'
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                     />
                     <div className='flex gap-2'>
                        <Button
                           size='sm'
                           type={'submit'}
                           className='min-w-fit px-2'
                           isLoading={uploadBioMutation.isPending}
                        >
                           Save
                        </Button>
                        <ButtonOutlined size='sm' className='min-w-fit px-2' onClick={toggleEditMode}>
                           Close
                        </ButtonOutlined>
                     </div>
                  </form>
               ) : (
                  <p className='leading-[188%] text-gray-400 lg:text-lg'>{bio}</p>
               )}
            </div>

            {isCurrentUserProfile && !isEditMode && (
               <IconButton onClick={toggleEditMode}>
                  <EditIcon />
               </IconButton>
            )}
         </div>
         <div className='w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8' />
      </>
   )
}
