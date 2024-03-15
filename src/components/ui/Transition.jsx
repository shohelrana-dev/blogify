import { motion } from 'framer-motion'

export default function Transition({ children, ...rest }) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: 'easeInOut' }}
         {...rest}
      >
         {children}
      </motion.div>
   )
}
