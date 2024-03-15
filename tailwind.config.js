/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,jsx}'],
   theme: {
      extend: {
         container: {
            center: true,
            padding: '1.25rem',
         },
         colors: {
            dark: '#121416',
            danger: '#dc2626',
         },
         height: {
            'screen-content': 'calc(100vh - 207px)',
         },
      },
   },
   plugins: [],
}
