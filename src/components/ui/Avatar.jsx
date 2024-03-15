import { getAvatarUrl } from '~/utils/image-url'

export default function Avatar({ name, avatar }) {
   if (avatar) {
      return (
         <div className='avater-img'>
            <img className='rounded-full w-10 h-10 object-cover' src={getAvatarUrl(avatar)} alt={name} />
         </div>
      )
   } else {
      return (
         <div className='avater-img bg-indigo-600 text-white'>
            <span className=''>{name[0].toUpperCase()}</span>
         </div>
      )
   }
}
