import Link from 'next/link'
import { UserRole } from '@/types'
import {
  Activity,
  Calendar,
  CreditCard,
  ForkKnife,
  FormInput,
  Home,
  MessagesSquare,
  User,
} from 'lucide-react'
import Header from './admin-header'

interface NavItem {
  href: string
  label: string
  icon?: React.ComponentType<any>
}

const navItems: Record<UserRole, NavItem[]> = {
  admin: [
    { href: '/admin', label: 'Overview', icon: Home },
    { href: '/admin/residents', label: 'Residents', icon: User },
    { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { href: '/admin/admit-form', label: 'Admit Form', icon: FormInput },
    { href: '/admin/staff', label: 'Staff', icon: User },
    { href: '/admin/meals', label: 'Meals', icon: ForkKnife },
    { href: '/admin/donations', label: 'Donations', icon: CreditCard },
    { href: '/admin/medical', label: 'Medical', icon: Activity },
    { href: '/admin/notices', label: 'Notices', icon: MessagesSquare },
    { href: '/admin/finance', label: 'Finance', icon: Activity },
  ],
  resident: [
    { href: '/resident', label: 'Overview' },
    { href: '/resident/profile', label: 'Profile' },
    { href: '/resident/meals', label: 'Meal Selection' },
    { href: '/resident/notices', label: 'Notices' },
    { href: '/resident/appointments', label: 'Appointments' },
  ],
  staff: [
    { href: '/staff', label: 'Overview' },
    { href: '/staff/residents', label: 'Assigned Residents' },
  ],
  cook: [
    { href: '/cook', label: 'Overview' },
    { href: '/cook/meals', label: 'Meal List' },
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
                  className='px-4 py-2 flex rounded items-center hover:bg-gray-700 transition-colors'
                >
                  {item.icon && <item.icon className='mr-2 h-4 w-4' />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1'>
        <Header />
        <div className='p-8'>{children}</div>
      </main>
    </div>
  )
}
