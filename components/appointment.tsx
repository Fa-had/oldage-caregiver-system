'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Clock } from 'lucide-react'

export default function AppointmentForm() {
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      fullName: formData.get('fullName'),
      visitorType: formData.get('visitorType'),
      contactNumber: formData.get('contactNumber'),
      email: formData.get('email'),
      visitDate: date ? format(date, 'yyyy-MM-dd') : '',
      visitTime: formData.get('visitTime'),
      purpose: formData.get('purpose'),
      personToVisit: formData.get('personToVisit'),
    }

    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      alert('Appointment booked!')
      e.currentTarget.reset()
      setDate(undefined)
    } else {
      alert('Failed to book appointment.')
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-lg mx-auto p-6 space-y-6 bg-white rounded-xl shadow'
    >
      <h1 className='text-2xl font-semibold'>Book an Appointment</h1>

      <Input name='fullName' placeholder='Enter your full name' required />

      <Select name='visitorType'>
        <SelectTrigger>
          <SelectValue placeholder='Select visitor type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='family'>Family</SelectItem>
          <SelectItem value='friend'>Friend</SelectItem>
          <SelectItem value='official'>Official</SelectItem>
        </SelectContent>
      </Select>

      <Input
        name='contactNumber'
        placeholder='Enter your contact number'
        required
      />

      <Input
        name='email'
        type='email'
        placeholder='Enter your email (optional)'
      />

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full justify-start text-left font-normal'
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : 'Select visit date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className='relative'>
        <Input name='visitTime' type='time' />
        <Clock className='absolute right-3 top-3 h-4 w-4 text-gray-400' />
      </div>

      <Textarea
        name='purpose'
        placeholder='Describe the purpose of your visit'
      />

      <Select name='personToVisit'>
        <SelectTrigger>
          <SelectValue placeholder='Select resident' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='resident1'>Resident 1</SelectItem>
          <SelectItem value='resident2'>Resident 2</SelectItem>
          <SelectItem value='resident3'>Resident 3</SelectItem>
        </SelectContent>
      </Select>

      <div className='flex gap-4'>
        <Button
          type='submit'
          className='bg-orange-500 hover:bg-orange-600'
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </Button>
        <Button type='reset' variant='outline'>
          Cancel
        </Button>
      </div>
    </form>
  )
}
