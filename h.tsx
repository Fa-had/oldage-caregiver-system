'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit2, Trash2, Plus } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

interface Resident {
  id: number
  residentCode: string
  fullName: string
  age: number
  gender: string
  caregiverName: string
  joiningDate: string
  status: string
}

export default function ResidentsPage() {
  const router = useRouter()
  const [residents, setResidents] = useState<Resident[]>([])
  const [search, setSearch] = useState('')

  const fetchResidents = async () => {
    const res = await fetch(`/api/residents?search=${search}`)
    const data = await res.json()
    setResidents(data.data || data)
  }

  useEffect(() => {
    fetchResidents()
  }, [search])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this resident?')) return
    await fetch(`/api/residents?id=${id}`, { method: 'DELETE' })
    fetchResidents()
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-gray-900'>Resident List</h2>
          <div className='flex gap-2'>
            <Input
              placeholder='Search resident...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-64'
            />
            <Button
              onClick={() => router.push('/admin/admit-form')}
              className='bg-orange-500 hover:bg-orange-600'
            >
              <Plus className='mr-2 h-4 w-4' /> Add Resident
            </Button>
          </div>
        </div>

        <div className='rounded-md border bg-white'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Caregiver</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.length > 0 ? (
                residents.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.residentCode}</TableCell>
                    <TableCell>{r.fullName}</TableCell>
                    <TableCell>{r.age}</TableCell>
                    <TableCell>
                      <Badge
                        variant={r.gender === 'Male' ? 'default' : 'secondary'}
                      >
                        {r.gender}
                      </Badge>
                    </TableCell>
                    <TableCell>{r.caregiverName}</TableCell>
                    <TableCell>{r.joiningDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          r.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(r.id)}
                      >
                        <Trash2 className='h-4 w-4 text-red-600' />
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
        </div>
      </div>
    </DashboardLayout>
  )
}
