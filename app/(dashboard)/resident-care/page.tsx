'use client'

import DashboardLayout from '@/components/dashboard-layout'
import { useEffect, useState } from 'react'

interface DashboardData {
  residentCount: number
  mealsToday: number
  medicalToday: number
  latestNotices: {
    id: number
    type: string
    message: string
    sender_name: string
    sender_role: string
    created_at: string
  }[]
}

export default function ResidentCare() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/resident-care/dashboard')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Error loading dashboard:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className='p-8 text-gray-500'>Loading dashboard...</div>
  }

  if (!data) {
    return <div className='p-8 text-red-500'>Failed to load data.</div>
  }

  return (
    <DashboardLayout userRole='resident_care'>
      <div className='p-8 space-y-6'>
        <h1 className='text-2xl font-semibold mb-4'>Resident Care Dashboard</h1>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white shadow rounded-lg p-6 border-l-4 border-blue-500'>
            <h2 className='text-gray-500 text-sm'>Assigned Residents</h2>
            <p className='text-3xl font-bold text-gray-900 mt-2'>
              {data.residentCount}
            </p>
          </div>
          <div className='bg-white shadow rounded-lg p-6 border-l-4 border-green-500'>
            <h2 className='text-gray-500 text-sm'>Meals Today</h2>
            <p className='text-3xl font-bold text-gray-900 mt-2'>
              {data.mealsToday}
            </p>
          </div>
          <div className='bg-white shadow rounded-lg p-6 border-l-4 border-orange-500'>
            <h2 className='text-gray-500 text-sm'>Medical Logs Today</h2>
            <p className='text-3xl font-bold text-gray-900 mt-2'>
              {data.medicalToday}
            </p>
          </div>
        </div>

        {/* Latest Notices */}
        <div className='bg-white rounded-lg shadow p-6 mt-8'>
          <h2 className='text-lg font-semibold mb-4 text-gray-800'>
            Latest Notices
          </h2>
          {data.latestNotices?.length === 0 ? (
            <p className='text-gray-500'>No notices available.</p>
          ) : (
            <ul className='space-y-3'>
              {data.latestNotices?.map((notice) => (
                <li
                  key={notice.id}
                  className='border-b pb-2 last:border-b-0 last:pb-0'
                >
                  <div className='flex justify-between'>
                    <p className='text-gray-800'>{notice.message}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        notice.type === 'urgent'
                          ? 'bg-red-100 text-red-700'
                          : notice.type === 'warning'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {notice.type}
                    </span>
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>
                    By {notice.sender_name} ({notice.sender_role})
                  </p>
                  <p className='text-xs text-gray-400'>
                    {new Date(notice.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
