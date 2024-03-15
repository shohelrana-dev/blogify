export default function getApiErrorMessage(error) {
   if (error.response) {
      if (error.response.data) {
         return error.response.data.error
      } else {
         return error.response.message
      }
   } else {
      return error.message
   }
}
