// import { requireRole } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard-layout'

export default async function AdminDashboard() {
  // const session = await requireRole(['admin'])

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Quick Stats */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-2'>Total Residents</h3>
            <p className='text-3xl font-bold'>0</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-2'>Active Staff</h3>
            <p className='text-3xl font-bold'>0</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-2'>Pending Appointments</h3>
            <p className='text-3xl font-bold'>0</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
          <div className='space-y-4'>
            <p className='text-gray-600'>No recent activity</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
