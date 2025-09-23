// 'use client'
// import { signIn } from 'next-auth/react'

// export default function LoginPage() {
//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     const formData = new FormData(event.currentTarget)

//     const result = await signIn('credentials', {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       redirect: true,
//       callbackUrl: '/dashboard',
//     })
//   }

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-gray-50'>
//       <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
//         <div>
//           <h2 className='text-center text-3xl font-bold text-gray-900'>
//             Sign in to your account
//           </h2>
//         </div>
//         <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
//           <div className='rounded-md shadow-sm -space-y-px'>
//             <div>
//               <label htmlFor='email' className='sr-only'>
//                 Email address
//               </label>
//               <input
//                 id='email'
//                 name='email'
//                 type='email'
//                 required
//                 className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
//                 placeholder='Email address'
//               />
//             </div>
//             <div>
//               <label htmlFor='password' className='sr-only'>
//                 Password
//               </label>
//               <input
//                 id='password'
//                 name='password'
//                 type='password'
//                 required
//                 className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
//                 placeholder='Password'
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type='submit'
//               className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
// app/login/page.tsx

// app/login/page.tsx

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  // State to handle form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  // Handle form data change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    router.push('/admin')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full'>
        {/* Left Section */}
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Image
            src='/house.png' // Replace with actual image path
            alt='House logo'
            width={200}
            height={200}
          />
          {/* <h1 className='text-2xl font-bold text-orange-600'>প্রবীণ নিবাস</h1> */}
        </div>

        {/* Right Section - Login Form */}
        <div className='flex flex-col justify-center space-y-6'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email or Username</Label>
              <Input
                id='email'
                name='email'
                type='text'
                placeholder='Enter your email or username'
                value={formData.email}
                onChange={handleInputChange}
                className='bg-gray-100'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='bg-gray-100 pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-2.5 text-gray-600'
                >
                  <EyeOff size={20} />
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between text-sm'>
              {/* <div className='flex items-center space-x-2'>
                <Checkbox
                  id='remember'
                  name='rememberMe'
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor='remember'>remembering me</Label>
              </div> */}
              <a href='#' className='text-gray-600 hover:underline'>
                Forget Password?
              </a>
            </div>

            <Button
              type='submit'
              className='w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6'
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
