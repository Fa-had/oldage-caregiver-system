export default function Work() {
  const works = [
    {
      title: 'New Recreation Center',
      desc: 'Opened a state-of-the-art recreation center with modern facilities.',
      img: '/work1.webp',
    },
    {
      title: 'Community Garden Project',
      desc: 'Residents grow their own vegetables, promoting social activity.',
      img: '/work2.webp',
    },
    {
      title: 'Digital Literacy Program',
      desc: 'Helping residents stay connected through technology.',
      img: '/work3.webp',
    },
  ]

  return (
    <section id='work' className='py-16 bg-white text-center'>
      <h2 className='text-3xl font-bold mb-10'>Recent Work</h2>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
        {works.map((w, i) => (
          <div
            key={i}
            className='bg-gray-50 rounded-lg shadow hover:shadow-lg transition'
          >
            <img
              src={w.img}
              alt={w.title}
              className='w-full h-48 object-cover rounded-t-lg'
            />
            <div className='p-4'>
              <h3 className='text-lg font-semibold mb-2'>{w.title}</h3>
              <p className='text-gray-600'>{w.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='mt-10 bg-orange-500 px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600'>
        View All Projects
      </button>
    </section>
  )
}
