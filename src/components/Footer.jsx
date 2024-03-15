import { Link } from 'react-router-dom'
import FacebookIcon from '~/assets/icons/facebook.svg?react'
import InstagramIcon from '~/assets/icons/instagram.svg?react'
import PinterestIcon from '~/assets/icons/pinterest.svg?react'
import TwitterIcon from '~/assets/icons/twitter.svg?react'
import YoutubeIcon from '~/assets/icons/youtube.svg?react'
import logo from '~/assets/logo.svg'

export default function Footer() {
   return (
      <footer className='my-6 md:my-8 bg-[#030317]'>
         <div className='container mx-auto flex items-center justify-between'>
            <Link to='/'>
               <img className='w-28' src={logo} alt='lws' />
            </Link>
            <ul className='flex items-center space-x-5'>
               <li className='text-center'>
                  <a className='text-white/50 hover:text-white transition-all duration-200' href='#'>
                     <FacebookIcon />
                  </a>
               </li>
               <li className='text-center'>
                  <a className='text-white/50 hover:text-white transition-all duration-200' href='#'>
                     <InstagramIcon />
                  </a>
               </li>
               <li className='text-center'>
                  <a className='text-white/50 hover:text-white transition-all duration-200' href='#'>
                     <TwitterIcon />
                  </a>
               </li>
               <li className='text-center'>
                  <a className='text-white/50 hover:text-white transition-all duration-200' href='#'>
                     <PinterestIcon />
                  </a>
               </li>
               <li className='text-center'>
                  <a className='text-white/50 hover:text-white transition-all duration-200' href='#'>
                     <YoutubeIcon />
                  </a>
               </li>
            </ul>
         </div>
      </footer>
   )
}
