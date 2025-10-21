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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Resident {
  id: number
  residentCode: string
  fullName: string
  age: number
  gender: string
  caregiverName: string
  joiningDate: string
  status: string
  caregiverId?: number
}

interface Caregiver {
  id: number
  name: string
}

export default function ResidentsPage() {
  const router = useRouter()
  const [residents, setResidents] = useState<Resident[]>([])
  const [search, setSearch] = useState('')
  const [caregivers, setCaregivers] = useState<Caregiver[]>([])
  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    null
  )
  const [open, setOpen] = useState(false)

  const fetchResidents = async () => {
    const res = await fetch(`/api/residents?search=${search}`)
    const data = await res.json()
    console.log('Resident: ', data)
    setResidents(data.data || data)
  }

  const fetchCaregivers = async () => {
    const res = await fetch('/api/caregivers')
    const data = await res.json()
    console.log('Caregiver: ', data)
    setCaregivers(data)
  }

  useEffect(() => {
    fetchResidents()
    fetchCaregivers()
  }, [search])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this resident?')) return
    await fetch(`/api/residents?id=${id}`, { method: 'DELETE' })
    fetchResidents()
  }

  const handleEdit = (resident: Resident) => {
    console.log('Resident from handle: ', resident)

    setSelectedResident(resident)
    setOpen(true)
  }

  const handleUpdate = async () => {
    if (!selectedResident) return
    await fetch('/api/residents', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedResident),
    })
    setOpen(false)
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
                    <TableCell>{r.caregiverName || 'Unassigned'}</TableCell>
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
                    <TableCell className='flex gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEdit(r)}
                      >
                        <Edit2 className='h-4 w-4 text-blue-600' />
                      </Button>
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
                    <Spinner /> Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Resident</DialogTitle>
          </DialogHeader>
          {selectedResident && (
            <div className='space-y-3'>
              <Label>Name</Label>
              <Input
                value={selectedResident.fullName}
                onChange={(e) =>
                  setSelectedResident({
                    ...selectedResident,
                    fullName: e.target.value,
                  })
                }
              />

              <Label>Age</Label>
              <Input
                type='number'
                value={selectedResident.age}
                onChange={(e) =>
                  setSelectedResident({
                    ...selectedResident,
                    age: Number(e.target.value),
                  })
                }
              />

              <Label>Gender</Label>
              <Select
                value={selectedResident.gender}
                onValueChange={(val) =>
                  setSelectedResident({ ...selectedResident, gender: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Gender' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Male'>Male</SelectItem>
                  <SelectItem value='Female'>Female</SelectItem>
                </SelectContent>
              </Select>

              <Label>Caregiver</Label>
              <Select
                value={String(selectedResident.caregiverId || '')}
                onValueChange={(val) =>
                  setSelectedResident({
                    ...selectedResident,
                    caregiverId: Number(val),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Assign caregiver' />
                </SelectTrigger>
                <SelectContent>
                  {caregivers.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Status</Label>
              <Select
                value={selectedResident.status}
                onValueChange={(val) =>
                  setSelectedResident({ ...selectedResident, status: val })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>

              <div className='flex justify-end'>
                <Button
                  onClick={handleUpdate}
                  className='bg-blue-500 hover:bg-blue-600'
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
