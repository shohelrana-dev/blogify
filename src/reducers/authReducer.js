export default function authReducer(state, { type, payload }) {
   switch (type) {
      case 'loggedin':
         state.isChecked = true
         state.isAuthenticated = true
         state.user = payload
         break

      case 'updated':
         state.user = payload
         break

      case 'logout':
         state.isChecked = true
         state.isAuthenticated = false
         state.user = null
         break

      default:
         throw new Error(`Action type '${type}' doesn't match.`)
   }
}
