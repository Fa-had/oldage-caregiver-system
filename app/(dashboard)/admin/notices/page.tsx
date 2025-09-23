'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Calendar, User } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

const notices = [
  {
    id: 1,
    date: 'Aug 8, 2025 - 10:00 AM',
    message:
      "Medication schedule updated. Please check the patient's new chart.",
    pinnedBy: 'Nurse Fatema',
    type: 'warning',
  },
  {
    id: 2,
    date: 'Aug 7, 2025 - 5:00 PM',
    message: 'Maintenance in Room 4B tomorrow. Expected downtime 9 - 11 AM',
    pinnedBy: 'Admin',
    type: 'info',
  },
]

const noticeTypes = [
  {
    value: 'info',
    label: 'Info',
    icon: Calendar,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    value: 'warning',
    label: 'Warning',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'urgent',
    label: 'Urgent',
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-800',
  },
]

export default function NoticesPage() {
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setShowAddForm(false)
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Notice Cards */}
        <div className='space-y-4'>
          {notices.map((notice) => (
            <Card
              key={notice.id}
              className='bg-white shadow-sm border-l-4 border-blue-500'
            >
              <CardContent className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2 mb-2'>
                      <Badge
                        className={
                          noticeTypes.find((t) => t.value === 'info')?.color
                        }
                      >
                        Info
                      </Badge>
                      <span className='text-sm text-gray-500'>
                        {notice.date}
                      </span>
                    </div>
                    <p className='text-gray-900 mb-3'>{notice.message}</p>
                    <div className='flex items-center space-x-2 text-sm text-gray-500'>
                      <User className='h-3 w-3' />
                      <span>Pinned: {notice.pinnedBy}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Notice Button */}
        <Button
          onClick={() => setShowAddForm(true)}
          className='bg-orange-500 hover:bg-orange-600'
        >
          + Add Notice
        </Button>

        {/* View All Notices */}
        <Button variant='outline'>View All Notices</Button>

        {/* Add Notice Form (Modal-like) */}
        {showAddForm && (
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle>Add Notice</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form onSubmit={handleAddNotice}>
                <div className='space-y-2'>
                  <Label htmlFor='type'>Notice Type</Label>
                  <Select>
                    <SelectTrigger id='type'>
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
                <div className='space-y-2'>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    placeholder='Enter notice message...'
                    rows={3}
                  />
                </div>
                <div className='flex space-x-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    className='bg-orange-500 hover:bg-orange-600'
                  >
                    Post Notice
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
