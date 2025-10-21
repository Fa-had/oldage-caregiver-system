'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { CalendarIcon, Trash2, Pencil } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface MedicalRecord {
  id: number
  residentId: number
  residentName: string
  date: string
  temperature: number
  bloodPressure: string
  heartRate: number
  oxygenLevel: number
  condition: string
  notes: string
}

export default function MedicalPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [search, setSearch] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({
    residentId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    oxygenLevel: '',
    condition: 'normal',
    notes: '',
  })

  // Fetch records
  const fetchRecords = async () => {
    const res = await fetch(`/api/medical?search=${search}`)
    const data = await res.json()
    setRecords(data)
  }

  useEffect(() => {
    fetchRecords()
  }, [search])

  // Add new record
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/medical', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    resetForm()
    fetchRecords()
  }

  // Delete record
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return
    await fetch(`/api/medical?id=${id}`, { method: 'DELETE' })
    fetchRecords()
  }

  // Edit record - open modal
  const openEditModal = (record: MedicalRecord) => {
    setSelectedRecord(record)
    setForm({
      residentId: String(record.residentId),
      date: record.date,
      temperature: String(record.temperature),
      bloodPressure: record.bloodPressure,
      heartRate: String(record.heartRate),
      oxygenLevel: String(record.oxygenLevel),
      condition: record.condition,
      notes: record.notes,
    })
    setIsModalOpen(true)
  }

  // Update record
  const handleUpdate = async () => {
    if (!selectedRecord) return
    await fetch('/api/medical', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedRecord.id, ...form }),
    })
    setIsModalOpen(false)
    fetchRecords()
  }

  const resetForm = () => {
    setForm({
      residentId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      oxygenLevel: '',
      condition: 'normal',
      notes: '',
    })
  }

  const conditionColors = {
    normal: 'bg-green-100 text-green-800',
    slightly_elevated: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Search Bar */}
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Medical Records</h2>
          <Input
            placeholder='Search by name...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-sm'
          />
        </div>

        {/* Records Table */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle>Patient Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resident</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Temp</TableHead>
                  <TableHead>BP</TableHead>
                  <TableHead>HR</TableHead>
                  <TableHead>O₂</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length > 0 &&
                  records.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.residentName}</TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>{r.temperature}</TableCell>
                      <TableCell>{r.bloodPressure}</TableCell>
                      <TableCell>{r.heartRate}</TableCell>
                      <TableCell>{r.oxygenLevel}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            conditionColors[
                              r.condition as keyof typeof conditionColors
                            ]
                          }
                        >
                          {r.condition.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{r.notes}</TableCell>
                      <TableCell className='flex gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => openEditModal(r)}
                        >
                          <Pencil className='h-4 w-4 text-blue-500' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleDelete(r.id)}
                        >
                          <Trash2 className='h-4 w-4 text-red-600' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {records.length === 0 && (
              <div className='p-4 text-center text-gray-500'>
                No medical records found.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Record Form */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle>Add Medical Record</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Resident ID</Label>
                <Input
                  value={form.residentId}
                  onChange={(e) =>
                    setForm({ ...form, residentId: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type='date'
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Temperature</Label>
                <Input
                  type='number'
                  value={form.temperature}
                  onChange={(e) =>
                    setForm({ ...form, temperature: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Blood Pressure</Label>
                <Input
                  value={form.bloodPressure}
                  onChange={(e) =>
                    setForm({ ...form, bloodPressure: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Heart Rate</Label>
                <Input
                  type='number'
                  value={form.heartRate}
                  onChange={(e) =>
                    setForm({ ...form, heartRate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Oxygen Level</Label>
                <Input
                  type='number'
                  value={form.oxygenLevel}
                  onChange={(e) =>
                    setForm({ ...form, oxygenLevel: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Condition</Label>
                <select
                  className='border p-2 rounded-md w-full'
                  value={form.condition}
                  onChange={(e) =>
                    setForm({ ...form, condition: e.target.value })
                  }
                >
                  <option value='normal'>Normal</option>
                  <option value='slightly_elevated'>Slightly Elevated</option>
                  <option value='critical'>Critical</option>
                </select>
              </div>
              <div className='col-span-2'>
                <Label>Notes</Label>
                <Input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
              <Button
                type='submit'
                className='col-span-2 bg-orange-500 hover:bg-orange-600'
              >
                Save Record
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medical Record</DialogTitle>
          </DialogHeader>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Date</Label>
              <Input
                type='date'
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <Label>Temperature</Label>
              <Input
                type='number'
                value={form.temperature}
                onChange={(e) =>
                  setForm({ ...form, temperature: e.target.value })
                }
              />
            </div>
            <div>
              <Label>BP</Label>
              <Input
                value={form.bloodPressure}
                onChange={(e) =>
                  setForm({ ...form, bloodPressure: e.target.value })
                }
              />
            </div>
            <div>
              <Label>HR</Label>
              <Input
                type='number'
                value={form.heartRate}
                onChange={(e) =>
                  setForm({ ...form, heartRate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>O₂</Label>
              <Input
                type='number'
                value={form.oxygenLevel}
                onChange={(e) =>
                  setForm({ ...form, oxygenLevel: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Condition</Label>
              <select
                className='border p-2 rounded-md w-full'
                value={form.condition}
                onChange={(e) =>
                  setForm({ ...form, condition: e.target.value })
                }
              >
                <option value='normal'>Normal</option>
                <option value='slightly_elevated'>Slightly Elevated</option>
                <option value='critical'>Critical</option>
              </select>
            </div>
            <div className='col-span-2'>
              <Label>Notes</Label>
              <Input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className='bg-orange-500 hover:bg-orange-600'
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
