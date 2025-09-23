'use client'

import { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  CalendarIcon,
  Search,
  Thermometer,
  HeartPulse,
  Activity,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DashboardLayout from '@/components/dashboard-layout'

const healthRecords = [
  {
    name: 'Amena',
    avatar: '/avatar-female.jpg',
    date: '2024-07-26',
    temp: 98.6,
    bp: '120/80',
    hr: 72,
    o2: 98,
    condition: 'Normal',
    notes: 'No issues',
  },
  {
    name: 'Bilkish',
    avatar: '/avatar-female.jpg',
    date: '2024-07-20',
    temp: 99.1,
    bp: '130/85',
    hr: 78,
    o2: 97,
    condition: 'Slightly',
    notes: 'Mild headache',
  },
  {
    name: 'Kuddus',
    avatar: '/avatar-male.jpg',
    date: '2024-07-24',
    temp: 98.7,
    bp: '125/82',
    hr: 75,
    o2: 98,
    condition: 'Normal',
    notes: 'Slight fatigue',
  },
  {
    name: 'Rahima',
    avatar: '/avatar-female.jpg',
    date: '2024-07-26',
    temp: 98.6,
    bp: '120/80',
    hr: 72,
    o2: 98,
    condition: 'Normal',
    notes: 'No issues reported',
  },
  {
    name: 'Rokeya',
    avatar: '/avatar-female.jpg',
    date: '2024-07-25',
    temp: 99.1,
    bp: '118/85',
    hr: 78,
    o2: 97,
    condition: 'Slightly',
    notes: 'Mild headache',
  },
  {
    name: 'Shafiqul',
    avatar: '/avatar-male.jpg',
    date: '2024-07-24',
    temp: 98.7,
    bp: '125/82',
    hr: 75,
    o2: 98,
    condition: 'Normal',
    notes: 'Slight fatigue',
  },
]

const conditionColors = {
  Normal: 'bg-green-100 text-green-800',
  Slightly: 'bg-yellow-100 text-yellow-800',
}

export default function MedicalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRecords = healthRecords.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Search and Filters */}
        <Card className='bg-white shadow-sm'>
          <CardContent className='pt-6'>
            <div className='flex flex-col md:flex-row gap-4 items-start md:items-center'>
              <Input
                placeholder='Search patient...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full md:w-64'
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='w-full md:w-auto'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    From: {format(date || new Date(), 'MM/dd/yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode='single' selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='w-full md:w-auto'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    To: {format(date || new Date(), 'MM/dd/yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode='single' selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
              <Button
                variant='outline'
                className='bg-orange-100 text-orange-700'
              >
                List | Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Health Records Table */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className='text-center'>Temp (°F)</TableHead>
                  <TableHead className='text-center'>BP (mmHg)</TableHead>
                  <TableHead className='text-center'>HR (bpm)</TableHead>
                  <TableHead className='text-center'>O2 (%)</TableHead>
                  <TableHead className='text-center'>Condition</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className='flex items-center space-x-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={record.avatar} />
                        <AvatarFallback>{record.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{record.name}</span>
                    </TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell className='text-center'>{record.temp}</TableCell>
                    <TableCell className='text-center'>{record.bp}</TableCell>
                    <TableCell className='text-center'>{record.hr}</TableCell>
                    <TableCell className='text-center'>{record.o2}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          conditionColors[
                            record.condition as keyof typeof conditionColors
                          ]
                        }
                      >
                        {record.condition}
                      </Badge>
                    </TableCell>
                    <TableCell className='max-w-xs truncate'>
                      {record.notes}
                    </TableCell>
                    <TableCell>
                      <Button variant='ghost' size='sm'>
                        Edit/View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Health Record Form */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle>Add Health Record</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <form onSubmit={handleAddRecord}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>Patient Name</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Patient' />
                    </SelectTrigger>
                    <SelectContent>
                      {healthRecords.map((r) => (
                        <SelectItem key={r.name} value={r.name}>
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='id'>ID</Label>
                  <Input id='id' placeholder='Enter ID' />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='date'>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline' className='w-full'>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {format(date || new Date(), 'MM/dd/yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={setDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='temp'>Temperature (°F)</Label>
                  <Input
                    id='temp'
                    type='number'
                    step='0.1'
                    placeholder='98.6'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='bp'>Blood Pressure (mmHg)</Label>
                  <Input id='bp' placeholder='120/80' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='hr'>Heart Rate (bpm)</Label>
                  <Input id='hr' type='number' placeholder='72' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='o2'>Oxygen Level (%)</Label>
                  <Input id='o2' type='number' placeholder='98' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='condition'>Condition</Label>
                  <Select>
                    <SelectTrigger id='condition'>
                      <SelectValue placeholder='Select Condition' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='normal'>Normal</SelectItem>
                      <SelectItem value='slightly'>
                        Slightly Elevated
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='notes'>Notes</Label>
                <Input id='notes' placeholder='Enter notes' />
              </div>
              <div className='flex space-x-2'>
                <Button type='button' variant='outline'>
                  Clear
                </Button>
                <Button
                  type='submit'
                  className='bg-orange-500 hover:bg-orange-600 flex-1'
                >
                  Save Record
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
