// components/Header.tsx

import { BellIcon, UserIcon } from 'lucide-react'

const Header = () => {
  return (
    <header className='bg-gray-800 p-4 flex justify-between items-center text-white'>
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-gray-700 text-white py-2 px-4 rounded-full w-96 focus:outline-none'
          />
        </div>
        <button className='bg-orange-600 text-white py-2 px-4 rounded-full'>
          + Add Resident
        </button>
      </div>
      <div className='flex items-center space-x-4'>
        <button className='relative'>
          <BellIcon className='h-6 w-6 text-white' />
          {/* Badge */}
          <span className='absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-1'>
            3
          </span>
        </button>
        <button className='flex items-center space-x-2'>
          <UserIcon className='h-6 w-6 text-white' />
          <span>Admin</span>
        </button>
      </div>
    </header>
  )
}

export default Header
