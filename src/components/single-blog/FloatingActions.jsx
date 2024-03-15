import { useState } from 'react'
import commentIcon from '~/assets/icons/comment.svg'
import heartFilledcon from '~/assets/icons/heart-filled.svg'
import heartIcon from '~/assets/icons/heart.svg'
import likeFilledIcon from '~/assets/icons/like-filled.svg'
import likeIcon from '~/assets/icons/like.svg'
import useAuthState from '~/hooks/useAuthState'
import { useToggleFavouriteMutation, useToggleLikeMutation } from '~/services/blog.service'

export default function FloatingActions({ blog }) {
   const { user: currentUser, isAuthenticated } = useAuthState())
   const toggleLikeMutation = useToggleLikeMutation()
   const toggleFavouriteMutation = useToggleFavouriteMutation()
   const [isLiked, setIsLiked] = useState(blog.likes.includes(currentUser.id))
   const [isFavourite, setIsFavourite] = useState(blog.isFavourite)

   async function handleLikeClick() {
      try {
         const data = await toggleLikeMutation.mutateAsync(blog.id)
         setIsLiked(data.isLiked)
      } catch (err) {
         console.error(err)
      }
   }

   async function handleFavouritClick() {
      try {
         await toggleFavouriteMutation.mutateAsync(blog.id)
         setIsFavourite(isFavourite)
      } catch (err) {
         console.error(err)
      }
   }

   if (!isAuthenticated) return null

   return (
      <div className='floating-action'>
         <ul className='floating-action-menus'>
            <li onClick={handleLikeClick}>
               <img src={isLiked ? likeFilledIcon : likeIcon} alt='like' />
               <span>{blog.likes?.length || 0}</span>
            </li>

            <li onClick={handleFavouritClick}>
               <img src={isFavourite ? heartFilledcon : heartIcon} alt='Favourite' />
            </li>

            <a href='#comments'>
               <li>
                  <img src={commentIcon} alt='Comments' />
                  <span>3</span>
               </li>
            </a>
         </ul>
      </div>
   )
}
