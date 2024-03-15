import Transition from '../ui/Transition'

export default function AuthLayout({ children, title }) {
   return (
      <Transition>
         <main>
            <section className='container'>
               <div className='w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12'>
                  <h2 className='text-2xl font-bold mb-6'>{title}</h2>

                  {children}
               </div>
            </section>
         </main>
      </Transition>
   )
}
