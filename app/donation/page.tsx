import Link from 'next/link'

// components/DonateSection.tsx
export default function DonateSection() {
  return (
    <section className='flex flex-col md:flex-row bg-white'>
      {/* Left Column */}
      <div className='flex-1 p-10 space-y-6'>
        <h1 className='text-4xl font-bold text-gray-800 leading-tight'>
          Help us to support <br />
          <span className='text-orange-600'>our seniors</span>
        </h1>
        <p className='text-gray-600'>
          Your contribution can bring comfort and joy to the lives of elderly
          residents in our old age home. Join us in providing them with the care
          and dignity they deserve in their golden years.
        </p>

        <div className='space-y-2'>
          <div className='flex justify-between text-sm font-semibold'>
            <span className='text-orange-600 bg-orange-100 px-2 py-1 rounded'>
              ৳76,520
            </span>
          </div>
          <div className='w-full bg-orange-100 h-2 rounded'>
            <div
              className='bg-orange-500 h-2 rounded'
              style={{ width: '7.6%' }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className='flex gap-4 text-center mt-4'>
          <div>
            <p className='text-lg font-bold'>৳1M</p>
            <p className='text-sm text-gray-500'>Goal</p>
          </div>
          <div>
            <p className='text-lg font-bold'>46</p>
            <p className='text-sm text-gray-500'>Days To Go</p>
          </div>
          <div>
            <p className='text-lg font-bold'>15308</p>
            <p className='text-sm text-gray-500'>Supporter</p>
          </div>
        </div>

        <button className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded mt-4 font-semibold'>
          <Link href={'/contribute'}> Contribute</Link>
        </button>
      </div>

      {/* Right Column (Image) */}
      <div className='flex-1'>
        <img
          src='/donate.webp'
          alt='Elder Donation'
          className='w-full h-full object-cover'
        />
      </div>
    </section>
  )
}
