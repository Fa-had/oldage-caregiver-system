import Link from 'next/link'
import { UserRole } from '@/types'

interface NavItem {
  href: string
  label: string
}

const navItems: Record<UserRole, NavItem[]> = {
  admin: [
    { href: '/dashboard/admin', label: 'Overview' },
    { href: '/dashboard/admin/residents', label: 'Residents' },
    { href: '/dashboard/admin/appointments', label: 'Appointments' },
    { href: '/dashboard/admin/staff', label: 'Staff' },
    { href: '/dashboard/admin/meals', label: 'Meals' },
    { href: '/dashboard/admin/notices', label: 'Notices' },
    { href: '/dashboard/admin/finance', label: 'Finance' },
  ],
  resident: [
    { href: '/dashboard/resident', label: 'Overview' },
    { href: '/dashboard/resident/profile', label: 'Profile' },
    { href: '/dashboard/resident/meals', label: 'Meal Selection' },
    { href: '/dashboard/resident/notices', label: 'Notices' },
    { href: '/dashboard/resident/appointments', label: 'Appointments' },
  ],
  staff: [
    { href: '/dashboard/staff', label: 'Overview' },
    { href: '/dashboard/staff/residents', label: 'Assigned Residents' },
  ],
  cook: [
    { href: '/dashboard/cook', label: 'Overview' },
    { href: '/dashboard/cook/meals', label: 'Meal List' },
  ],
  visitor: [],
}

export default function DashboardLayout({
  children,
  userRole,
}: {
  children: React.ReactNode
  userRole: UserRole
}) {
  const items = navItems[userRole]

  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-800 text-white'>
        <nav className='p-4'>
          <div className='mb-8'>
            <h2 className='text-xl font-bold'>Elderly Care</h2>
          </div>
          <ul className='space-y-2'>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className='block px-4 py-2 rounded hover:bg-gray-700 transition-colors'
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8'>{children}</main>
    </div>
  )
}
