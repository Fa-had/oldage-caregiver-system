'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Edit2, Trash2, Plus } from 'lucide-react'

interface Staff {
  id: number
  full_name: string
  role: string
  work_hours: string
  contact: string
  email: string
  status: string
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState<Staff | null>(null)
  const [form, setForm] = useState({
    full_name: '',
    role: 'resident_care',
    work_hours: '',
    contact: '',
    email: '',
  })

  const fetchStaff = async () => {
    const res = await fetch('/api/staff')
    const data = await res.json()
    setStaff(data)
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = selected ? 'PUT' : 'POST'
    const body = selected ? { id: selected.id, ...form } : form

    await fetch('/api/staff', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setIsModalOpen(false)
    setSelected(null)
    setForm({
      full_name: '',
      role: 'resident_care',
      work_hours: '',
      contact: '',
      email: '',
    })
    fetchStaff()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this staff member?')) return
    await fetch(`/api/staff?id=${id}`, { method: 'DELETE' })
    fetchStaff()
  }

  const openEditModal = (staff: Staff) => {
    setSelected(staff)
    setForm({
      full_name: staff.full_name,
      role: staff.role,
      work_hours: staff.work_hours,
      contact: staff.contact,
      email: staff.email,
    })
    setIsModalOpen(true)
  }

  const filteredData =
    staff.length > 0
      ? staff.filter((s) => {
          const matchesSearch =
            s.full_name.toLowerCase().includes(search.toLowerCase()) ||
            s.role.toLowerCase().includes(search.toLowerCase()) ||
            s.contact.toLowerCase().includes(search.toLowerCase())
          const matchesRole =
            filterRole === 'all' ? true : s.role === filterRole
          return matchesSearch && matchesRole
        })
      : []

  const uniqueRoles = [
    ...new Set(staff.length > 0 ? staff.map((s) => s.role) : []),
  ]

  return (
    <DashboardLayout userRole='admin'>
      <div className='container mx-auto p-4'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h1 className='text-2xl font-bold'>Staff Management</h1>
            <p className='text-muted-foreground'>
              Manage staff members and their roles.
            </p>
          </div>
          <Button
            onClick={() => {
              setSelected(null)
              setIsModalOpen(true)
            }}
            className='bg-orange-500 text-white hover:bg-orange-600'
          >
            <Plus className='mr-2 h-4 w-4' /> Add Staff
          </Button>
        </div>

        <div className='mb-4 flex space-x-4'>
          <Input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-sm'
          />
          <Select onValueChange={setFilterRole} value={filterRole}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='All Roles' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Roles</SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='border rounded-md'>
          <div className='grid grid-cols-6 p-2 bg-gray-100 font-bold'>
            <div>Name</div>
            <div>Role</div>
            <div>Work Hours</div>
            <div>Contact</div>
            <div>Email</div>
            <div>Actions</div>
          </div>
          {filteredData.map((s) => (
            <div key={s.id} className='grid grid-cols-6 p-2 border-t'>
              <div>{s.full_name}</div>
              <div>{s.role}</div>
              <div>{s.work_hours}</div>
              <div>{s.contact}</div>
              <div>{s.email}</div>
              <div className='space-x-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => openEditModal(s)}
                >
                  <Edit2 className='h-4 w-4 text-blue-500' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleDelete(s.id)}
                >
                  <Trash2 className='h-4 w-4 text-red-600' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label>Full Name</Label>
              <Input
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm({ ...form, role: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='medical'>Medical</SelectItem>
                  <SelectItem value='cook'>Meal</SelectItem>
                  <SelectItem value='resident_care'>Resident Care</SelectItem>
                  <SelectItem value='maintenance'>Maintenance</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Work Hours</Label>
              <Input
                value={form.work_hours}
                onChange={(e) =>
                  setForm({ ...form, work_hours: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Contact</Label>
              <Input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type='email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button
                variant='outline'
                type='button'
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-orange-500 hover:bg-orange-600'
              >
                {selected ? 'Update' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
