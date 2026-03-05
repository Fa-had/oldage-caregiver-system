'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
    const res = await fetch(`/api/resident-care/residents?search=${search}`)
    const data = await res.json()
    setResidents(data.data || data)
  }

  useEffect(() => {
    fetchResidents()
  }, [search])

  return (
    <DashboardLayout userRole='resident_care'>
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
