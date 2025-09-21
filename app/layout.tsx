import './globals.css'

export const metadata = {
  title: 'প্রবীণ নিবাস',
  description: 'Elderly care and support community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='font-sans bg-white text-gray-900'>{children}</body>
    </html>
  )
}
