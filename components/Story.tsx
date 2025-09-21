export default function Story() {
  return (
    <section id='story' className='py-16 bg-white'>
      <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        <img
          src='/story1.webp'
          alt='Our Story'
          className='rounded-lg shadow-lg'
        />
        <div>
          <h2 className='text-3xl font-bold mb-6'>Our Story</h2>
          <p className='mb-4 text-gray-700'>
            Every resident has a unique story, and we’re honored to be part of
            their journey. At প্রবীণ নিবাস, we create a community where memories
            are cherished and celebrated.
          </p>
          <p className='mb-4 text-gray-700'>
            With our dedicated team, we empower seniors to live with dignity and
            joy.
          </p>
          <button className='mt-4 bg-orange-500 px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600'>
            Read More Stories
          </button>
        </div>
      </div>
    </section>
  )
}
