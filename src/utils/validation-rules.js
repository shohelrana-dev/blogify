export const signupRules = {
   firstName: {
      required: 'First name is required.',
      maxLength: { value: 15, message: 'First name should be a maximum of 15 characters.' },
   },
   lastName: {
      required: 'Last name is required.',
      maxLength: { value: 15, message: 'Last name should be a maximum of 15 characters.' },
   },
   email: {
      required: 'Email address is required.',
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email must be a valid email address.' },
   },
   password: {
      required: 'Password is required.',
      pattern: {
         value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+|{}[\]:;<>,.?/~]).{8,}$/,
         message:
            'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.',
      },
   },
}

export const loginRules = {
   email: {
      required: 'Email address is required.',
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email must be a valid email address.' },
   },
   password: {
      required: 'Password is required.',
   },
}
