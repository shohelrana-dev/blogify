import { forwardRef, useState } from 'react'
import EyeOffIcon from '~/assets/icons/eye-off.svg?react'
import EyeIcon from '~/assets/icons/eye.svg?react'
import IconButton from '../ui/IconButton'
import TextField from './TextField'

const PasswordField = forwardRef((props, ref) => {
   const [isVisible, setIsVisible] = useState(false)

   const toggleVisibility = () => setIsVisible(!isVisible)

   const passwordEyeIcon = (
      <IconButton
         aria-label='toggle password visibility'
         onClick={toggleVisibility}
         className='icon-btn'
      >
         {isVisible ? <EyeOffIcon /> : <EyeIcon />}
      </IconButton>
   )

   return (
      <TextField
         type={isVisible ? 'text' : 'password'}
         endIcon={passwordEyeIcon}
         {...props}
         ref={ref}
      ></TextField>
   )
})

PasswordField.displayName = 'PasswordField'
export default PasswordField
