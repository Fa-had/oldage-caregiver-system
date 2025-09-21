// import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'
// import { authOptions } from '../app/api/auth/[...nextauth]/route'
// import { UserRole } from '@/types'

// export async function requireAuth() {
//   const session = await getServerSession(authOptions)

//   if (!session) {
//     redirect('/login')
//   }

//   return session
// }

// export async function requireRole(allowedRoles: UserRole[]) {
//   const session = await requireAuth()

//   if (
//     !session?.user?.role ||
//     !allowedRoles.includes(session.user.role as UserRole)
//   ) {
//     redirect('/unauthorized')
//   }

//   return session
// }

// export function getDashboardPath(role: UserRole): string {
//   switch (role) {
//     case 'admin':
//       return '/dashboard/admin'
//     case 'resident':
//       return '/dashboard/resident'
//     case 'staff':
//       return '/dashboard/staff'
//     case 'cook':
//       return '/dashboard/cook'
//     default:
//       return '/'
//   }
// }
