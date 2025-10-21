'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DashboardLayout from '@/components/dashboard-layout'
import { Spinner } from '@/components/ui/spinner'

type Appointment = {
  id: number
  visitor_name: string
  purpose: string
  appointment_time: string
  status: string
}

export default function AppointmentsPage() {
  const [showModal, setShowModal] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [newAppointment, setNewAppointment] = useState({
    visitorName: '',
    purpose: '',
    appointment_time: '',
  })

  useEffect(() => {
    fetchAppointments()
  }, [])

  async function fetchAppointments() {
    try {
      setLoading(true)
      const res = await fetch('/api/appointments')
      const data = await res.json()
      if (!data.error) {
        setAppointments(data)
        console.log('Data: ', data)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching appointments:', error)
    }
  }

  async function addAppointment() {
    await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment),
    })
    setNewAppointment({ visitorName: '', purpose: '', appointment_time: '' })
    fetchAppointments()
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchAppointments()
  }

  async function deleteAppointment(id: number) {
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
    fetchAppointments()
  }

  return (
    <DashboardLayout userRole='admin'>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>New Appointment</h2>
            <div className='space-y-4'>
              <Input
                placeholder='Visitor Name'
                value={newAppointment.visitorName}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    visitorName: e.target.value,
                  })
                }
              />
              <Input
                placeholder='Purpose'
                value={newAppointment.purpose}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    purpose: e.target.value,
                  })
                }
              />
              <Input
                type='datetime-local'
                value={newAppointment.appointment_time}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    appointment_time: e.target.value,
                  })
                }
              />
              <div className='flex justify-end space-x-2'>
                <Button variant='outline' onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button
                  className='bg-orange-500 hover:bg-orange-600'
                  onClick={async () => {
                    await addAppointment()
                    setShowModal(false)
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Appointments</h2>
          <Button
            onClick={() => setShowModal(true)}
            className='bg-orange-500 hover:bg-orange-600'
          >
            + Add Appointment
          </Button>
        </div>

        <Input
          placeholder='Search appointments...'
          className='max-w-md'
          onChange={(e) => console.log(e.target.value)}
        />

        <div className='rounded-md border bg-white'>
          {loading ? (
            <p className='p-4 text-gray-500'>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.visitor_name}</TableCell>
                      <TableCell>{a.purpose}</TableCell>
                      <TableCell>
                        {new Date(a.appointment_time).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge>{a.status}</Badge>
                      </TableCell>
                      <TableCell className='space-x-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => updateStatus(a.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => updateStatus(a.id, 'rejected')}
                        >
                          Reject
                        </Button>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => deleteAppointment(a.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align='center' colSpan={8}>
                      <Spinner />
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
