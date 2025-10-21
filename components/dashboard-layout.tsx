'use client'
import Link from 'next/link'
import { UserRole } from '@/types'
import {
  Activity,
  Calendar,
  CreditCard,
  ForkKnife,
  FormInput,
  Home,
  HomeIcon,
  MessagesSquare,
  Users,
} from 'lucide-react'
import Header from './admin-header'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon?: React.ComponentType<any>
}

const navItems: Record<UserRole, NavItem[]> = {
  admin: [
    { href: '/admin', label: 'Overview', icon: Home },
    { href: '/admin/residents', label: 'Residents', icon: Users },
    { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { href: '/admin/admit-form', label: 'Admit Form', icon: FormInput },
    { href: '/admin/staff', label: 'Staff', icon: Users },
    { href: '/admin/meals', label: 'Meals', icon: ForkKnife },
    { href: '/admin/donations', label: 'Donations', icon: CreditCard },
    { href: '/admin/medical', label: 'Medical', icon: Activity },
    { href: '/admin/notices', label: 'Notices', icon: MessagesSquare },
    { href: '/admin/finance', label: 'Finance', icon: Activity },
  ],
  resident_care: [
    { href: '/resident-care', label: 'Overview', icon: Home },
    { href: '/resident-care/residents', label: 'Residents', icon: Users },
    { href: '/resident-care/medical', label: 'Medical', icon: Activity },
    { href: '/resident-care/meals', label: 'Meal', icon: ForkKnife },
    { href: '/resident-care/notices', label: 'Notices', icon: MessagesSquare },
  ],
  cook: [
    { href: '/cook', label: 'Overview', icon: Home },
    { href: '/cook/meals', label: 'Meal List', icon: ForkKnife },
    { href: '/cook/notices', label: 'Notices', icon: MessagesSquare },
  ],
}

export default function DashboardLayout({
  children,
  userRole,
  className,
}: {
  children: React.ReactNode
  userRole: UserRole
  className?: string | ''
}) {
  const items = navItems[userRole]
  const pathname = usePathname()
  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-800 text-white'>
        <nav className='sticky top-0 p-4'>
          <div className='mb-8'>
            <div className='flex flex-1 justify-center items-center space-x-2'>
              <span className='text-orange-500 text-xl font-bold'>
                <HomeIcon className='inline-block mr-2 h-6 w-6' />
                প্রবীণ নিবাস
              </span>
            </div>
          </div>
          <ul className='space-y-2'>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 flex rounded items-center hover:bg-gray-700 transition-colors active:text-orange-500 ${
                    pathname === item.href ? 'bg-gray-300 text-gray-900' : ''
                  }`}
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
        <div className={`p-8 ${className}`}>{children}</div>
      </main>
    </div>
  )
}
