import { NavLink } from 'react-router-dom'
import logo from '~/assets/logo.svg'
import useAuthState from '~/hooks/useAuthState'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import SearchNavItem from './SearchNavItem'

export default function Header() {
   const { isAuthenticated, user } = useAuthState()

   return (
      <header>
         <nav className='container'>
            <div>
               <NavLink to='/'>
                  <img className='w-32' src={logo} alt='lws' />
               </NavLink>
            </div>

            <div>
               <ul className='flex items-center space-x-5'>
                  <li>
                     <NavLink to='/blogs/create'>
                        <Button>Write</Button>
                     </NavLink>
                  </li>

                  {isAuthenticated ? (
                     <>
                        <SearchNavItem />
                        <li>
                           <NavLink
                              to='/auth/logout'
                              className='text-white/50 hover:text-white transition-all duration-200'
                           >
                              Logout
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     <li>
                        <NavLink
                           to='/auth/login'
                           className='text-white/50 hover:text-white transition-all duration-200'
                        >
                           Login
                        </NavLink>
                     </li>
                  )}

                  {isAuthenticated && (
                     <li className='flex items-center'>
                        <Avatar name={user.firstName} avatar={user.avatar} />

                        <NavLink to={`/profile/${user.id}`}>
                           <span className='text-white ml-2'>{`${user.firstName} ${user.lastName}`}</span>
                        </NavLink>
                     </li>
                  )}
               </ul>
            </div>
         </nav>
      </header>
   )
}
