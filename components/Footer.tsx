import { Button } from './ui/button'

export default function Footer() {
  return (
    <footer id='contact' className='bg-black text-white py-12'>
      <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6'>
        <div>
          <h3 className='text-xl font-bold text-orange-500 mb-4'>
            প্রবীণ নিবাস
          </h3>
          <p className='text-gray-400'>
            Providing a compassionate home and vibrant community for elderly
            residents.
          </p>
        </div>
        <div>
          <h4 className='text-lg font-semibold mb-3'>Our Services</h4>
          <ul className='space-y-2 text-gray-400'>
            <li>24/7 Medical Care</li>
            <li>Comfortable Living</li>
            <li>Rehabilitation Programs</li>
          </ul>
        </div>
        <div>
          <h4 className='text-lg font-semibold mb-3'>Contact Us</h4>
          <p className='text-gray-400'>123 Main Street, Dhaka</p>
          <p className='text-gray-400'>(+880) 123-456-789</p>
          <p className='text-gray-400'>info@probinibash.com</p>
          <Button className='mt-4 bg-orange-500 px-6 py-2 rounded-lg text-white hover:bg-orange-600'>
            Appointment Now
          </Button>
        </div>
      </div>
      <div className='text-center text-gray-500 mt-8 text-sm'>
        © 2025 প্রবীণ নিবাস. All rights reserved.
      </div>
    </footer>
  )
}
