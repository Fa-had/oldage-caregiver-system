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
import { Clock, User, Calendar, Phone, MapPin } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

const appointments = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    type: 'Client',
    contact: '+8801745678901',
    date: '2024-03-15',
    time: '10:00 AM',
    person: 'Fatima Khan',
    purpose: 'Project Discussion',
    status: 'Waiting',
  },
  {
    id: 2,
    name: 'Omar Faruk',
    type: 'Vendor',
    contact: '+8801745678902',
    date: '2024-03-16',
    time: '02:00 PM',
    person: 'Jamal Hasan',
    purpose: 'Product Demo',
    status: 'Confirmed',
  },
  {
    id: 3,
    name: 'Nadia Islam',
    type: 'Interviewee',
    contact: '+8801745678903',
    date: '2024-03-17',
    time: '11:00 AM',
    person: 'Tasnim Ahmed',
    purpose: 'Software Engineer',
    status: 'Cancelled',
  },
  {
    id: 4,
    name: 'Raf Chowdhury',
    type: 'Client',
    contact: '+8801745678904',
    date: '2024-03-18',
    time: '09:30 AM',
    person: 'Kamal Hossain',
    purpose: 'Contract Review',
    status: 'Waiting',
  },
  {
    id: 5,
    name: 'Sara Khan',
    type: 'Vendor',
    contact: '+8801745678905',
    date: '2024-03-19',
    time: '03:30 PM',
    person: 'Nazia Haque',
    purpose: 'Sales Presentation',
    status: 'Confirmed',
  },
]

const statusColors = {
  Waiting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Confirmed: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
}

export default function AppointmentsPage() {
  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Appointments List
          </h2>
          <Button className='bg-orange-500 hover:bg-orange-600'>
            + Add Appointment
          </Button>
        </div>

        <Input placeholder='Search appointments...' className='max-w-md' />

        <div className='rounded-md border bg-white'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Person To</TableHead>
                <TableHead>Purpose of Visit</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className='font-medium'>
                    {appointment.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className='text-xs'>
                      {appointment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{appointment.contact}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-1'>
                      <Clock className='h-3 w-3' />
                      <span>{appointment.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.person}</TableCell>
                  <TableCell>{appointment.purpose}</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs ${
                        statusColors[
                          appointment.status as keyof typeof statusColors
                        ]
                      }`}
                    >
                      {appointment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
