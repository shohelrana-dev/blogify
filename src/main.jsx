import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import ConfirmAlertProvider from './providers/ConfirmAlertProvider.jsx'
import UnauthorizedAlertProvider from './providers/UnauthorizedAlertProvider.jsx'

const queryClient = new QueryClient({
   defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
})

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <UnauthorizedAlertProvider>
            <QueryClientProvider client={queryClient}>
               <AuthProvider>
                  <ConfirmAlertProvider>
                     <App />
                     <ToastContainer position='top-right' theme='dark' />
                     <ReactQueryDevtools initialIsOpen={false} />
                  </ConfirmAlertProvider>
               </AuthProvider>
            </QueryClientProvider>
         </UnauthorizedAlertProvider>
      </BrowserRouter>
   </React.StrictMode>
)
