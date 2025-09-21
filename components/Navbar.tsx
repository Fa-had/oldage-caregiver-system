'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='w-full bg-black text-white fixed top-0 z-50 shadow'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-3'>
        <div className='flex items-center space-x-2'>
          <span className='text-orange-500 text-xl font-bold'>
            প্রবীণ নিবাস
          </span>
        </div>
        <ul className='hidden md:flex space-x-6'>
          <li>
            <Link href='#services'>Our Services</Link>
          </li>
          <li>
            <Link href='#work'>Recent Work</Link>
          </li>
          <li>
            <Link href='#story'>Story</Link>
          </li>
          <li>
            <Link href='#contact'>Contact</Link>
          </li>
          <li>
            <Link href='#notice'>Notice</Link>
          </li>
        </ul>
        <Link
          href='/login'
          className='bg-orange-500 px-4 py-2 rounded text-white'
        >
          Log In
        </Link>
      </div>
    </nav>
  )
}
