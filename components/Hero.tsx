import Link from 'next/link'

export default function Hero() {
  return (
    <section className='relative h-screen flex items-center justify-center text-center bg-black'>
      <img
        src='/hero-bg.webp'
        alt='Elderly woman'
        className='absolute inset-0 w-full h-full object-cover opacity-70'
      />
      <div className='relative z-10 max-w-3xl text-white'>
        <h1 className='text-4xl md:text-6xl font-bold'>
          Each <span className='text-orange-500'>Wrinkle</span> has a Story to
          tell
        </h1>
        <p className='mt-4 text-lg'>
          Let’s all help make life better for those who made our life better.
        </p>
        <button className='mt-6 bg-orange-500 px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600'>
          <Link href='/donation'>Donate</Link>
        </button>
      </div>
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse'></div>
        </div>
      </div>
    </section>
  )
}
