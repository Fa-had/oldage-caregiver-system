'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  User,
  AlertTriangle,
  Calendar,
  Edit2,
  Trash2,
  Plus,
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

interface Notice {
  id: number
  type: string
  message: string
  created_at: string
  updated_at: string
  created_by: string
}

const noticeTypes = [
  { value: 'info', label: 'Info', color: 'bg-blue-100 text-blue-800' },
  {
    value: 'warning',
    label: 'Warning',
    color: 'bg-yellow-100 text-yellow-800',
  },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
]

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState<Notice | null>(null)
  const [form, setForm] = useState({ type: 'info', message: '' })

  // TODO: Replace with logged-in staff/admin ID
  const created_by = 1

  const fetchNotices = async () => {
    const res = await fetch('/api/notices')
    const data = await res.json()
    setNotices(data)
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = selected ? 'PUT' : 'POST'
    const body = selected
      ? { id: selected.id, ...form }
      : { ...form, created_by }
    await fetch('/api/notices', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setIsModalOpen(false)
    setSelected(null)
    setForm({ type: 'info', message: '' })
    fetchNotices()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return
    await fetch(`/api/notices?id=${id}`, { method: 'DELETE' })
    fetchNotices()
  }

  const openEditModal = (notice: Notice) => {
    setSelected(notice)
    setForm({ type: notice.type, message: notice.message })
    setIsModalOpen(true)
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-900'>Notices</h2>
          <Button
            onClick={() => {
              setSelected(null)
              setIsModalOpen(true)
            }}
            className='bg-orange-500 hover:bg-orange-600'
          >
            <Plus className='mr-2 h-4 w-4' /> Add Notice
          </Button>
        </div>

        <div className='space-y-4'>
          {notices.length > 0 &&
            notices.map((notice) => (
              <Card
                key={notice.id}
                className='bg-white shadow-sm border-l-4 border-blue-500'
              >
                <CardContent className='p-6'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <div className='flex items-center space-x-2 mb-2'>
                        <Badge
                          className={
                            noticeTypes.find((t) => t.value === notice.type)
                              ?.color
                          }
                        >
                          {notice.type.toUpperCase()}
                        </Badge>
                        <span className='text-sm text-gray-500'>
                          {new Date(notice.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className='text-gray-900 mb-3'>{notice.message}</p>
                      <div className='flex items-center space-x-2 text-sm text-gray-500'>
                        <User className='h-3 w-3' />
                        <span>
                          Created by: {notice.created_by || 'Unknown'}
                        </span>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => openEditModal(notice)}
                      >
                        <Edit2 className='h-4 w-4 text-blue-500' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(notice.id)}
                      >
                        <Trash2 className='h-4 w-4 text-red-600' />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected ? 'Edit Notice' : 'Add Notice'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label>Notice Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm({ ...form, type: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Type' />
                </SelectTrigger>
                <SelectContent>
                  {noticeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder='Enter notice message...'
                rows={3}
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
                {selected ? 'Update' : 'Post'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
