'use client'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { User, CalendarIcon, Pill, FileText, Activity } from 'lucide-react'
import BDTSign from '@/components/ui/bdtsign'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)

  const fetchData = async () => {
    const res = await fetch('/api/dashboard')
    const result = await res.json()
    setData(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data || data.error) {
    console.log('No Data')
    console.log('Data: ', data)
    return (
      <DashboardLayout userRole='admin'>
        <div className='flex w-full h-[90vh] justify-center items-center'>
          <Button disabled size='lg'>
            <Spinner />
            Loading...
          </Button>
        </div>
      </DashboardLayout>
    )
  }
  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>

        {/* Top Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <StatCard name='Total Residents' value={data.residents} icon={User} />
          <StatCard
            name='Appointments'
            value={data.appointments}
            icon={CalendarIcon}
          />
          <StatCard
            name='Pending Meals'
            value={data.pendingMeals}
            icon={Pill}
          />
        </div>

        {/* Finance Overview */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <FileText className='h-4 w-4' />
              <span>Finance Overview</span>
            </CardTitle>
            <CardDescription>Monthly financial trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={data.finance}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='total' fill='#f97316' name='Revenue' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Health & Rooms */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <HealthOverview health={data.healthStats} />
          <RoomOverview rooms={data.rooms} />
        </div>
      </div>
    </DashboardLayout>
  )
}

function StatCard({
  name,
  value,
  icon: Icon,
}: {
  name: string
  value: number
  icon: any
}) {
  return (
    <Card className='bg-white shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium text-gray-600'>
          {name}
        </CardTitle>
        <Icon className='h-4 w-4 text-gray-400' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-gray-900'>{value}</div>
      </CardContent>
    </Card>
  )
}

function HealthOverview({
  health,
}: {
  health: { condition: string; count: number }[]
}) {
  return (
    <Card className='bg-white shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Activity className='h-4 w-4' />
          <span>Health Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {health.map((h: { condition: string; count: number }) => (
          <div
            key={h.condition}
            className='flex justify-between border-b py-2 text-sm'
          >
            <span>{h.condition}</span>
            <Badge>{h.count}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function RoomOverview({
  rooms,
}: {
  rooms: { totalRooms: number; fullRooms: number }
}) {
  return (
    <Card className='bg-white shadow-sm'>
      <CardHeader>
        <CardTitle>Room Overview</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 text-sm'>
        <p>Total Rooms: {rooms.totalRooms}</p>
        <p>Full Rooms: {rooms.fullRooms}</p>
      </CardContent>
    </Card>
  )
}
