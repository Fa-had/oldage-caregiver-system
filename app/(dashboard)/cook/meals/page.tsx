'use client'
import DashboardLayout from '@/components/dashboard-layout'
import React, { useEffect, useState } from 'react'

interface Meal {
  id: number
  resident_full_name?: string
  date: string
  type: string
  status: string
  notes?: string
}
const CookPage = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [filterDate, setFilterDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  )
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/cook/meals?date=${filterDate}`)
    const data = await res.json()
    setMeals(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [filterDate])

  async function updateStatus(id: number, status: string) {
    const res = await fetch('/api/cook/meals/update-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mealId: id, status }),
    })
    const data = await res.json()
    if (data.success) load()
  }
  return (
    <DashboardLayout userRole='cook'>
      <div>
        <div className='flex items-center gap-4 mb-6'>
          <h1 className='text-2xl font-semibold'>Meal Orders</h1>
          <input
            type='date'
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className='border p-2 rounded'
          />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className='w-full table-auto'>
            <thead className='text-left'>
              <tr>
                <th className='p-2'>Resident</th>
                <th className='p-2'>Date</th>
                <th className='p-2'>Type</th>
                <th className='p-2'>Status</th>
                <th className='p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.length > 0 &&
                meals.map((m) => (
                  <tr key={m.id}>
                    <td className='p-2'>{m.resident_full_name}</td>
                    <td className='p-2'>{m.date}</td>
                    <td className='p-2'>{m.type}</td>
                    <td className='p-2'>{m.status}</td>
                    <td className='p-2 flex gap-2'>
                      {m.status !== 'prepared' && (
                        <button
                          className='px-2 py-1 bg-yellow-500 rounded'
                          onClick={() => updateStatus(m.id, 'prepared')}
                        >
                          Prepared
                        </button>
                      )}
                      {m.status !== 'delivered' && (
                        <button
                          className='px-2 py-1 bg-green-600 text-white rounded'
                          onClick={() => updateStatus(m.id, 'delivered')}
                        >
                          Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}

export default CookPage
