import { useRef, useState } from 'react'

export default function useSelectFile() {
   const inputRef = useRef(null)
   const [selectedFile, setSelectedFile] = useState(null)

   function handleChange(event) {
      setSelectedFile(event.target.files?.[0] || null)
   }

   function handleClick() {
      inputRef.current?.click()
   }

   function removeSelectedFile() {
      setSelectedFile(null)

      if (inputRef.current?.value) {
         inputRef.current.value = ''
      }
   }

   return { inputRef, handleChange, selectedFile, handleClick, removeSelectedFile }
}
