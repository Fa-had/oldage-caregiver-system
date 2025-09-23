'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { CalendarIcon } from 'lucide-react'
import { DollarSign, Users } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

const donations = [
  {
    id: 1,
    donor: 'Forhad',
    amount: '৳100.00',
    type: 'Cash',
    date: 'Oct 26, 2023',
    status: 'Completed',
  },
  {
    id: 2,
    donor: 'Sunny',
    amount: '200kg Rice',
    type: 'Goods',
    date: 'Oct 25, 2023',
    status: 'Completed',
  },
  {
    id: 3,
    donor: 'Fahad',
    amount: '$250.00',
    type: 'Cash',
    date: 'Oct 24, 2023',
    status: 'Pending',
  },
  {
    id: 4,
    donor: 'Mabrur',
    amount: '5 hours',
    type: 'Service',
    date: 'Oct 23, 2023',
    status: 'Cancelled',
  },
  {
    id: 5,
    donor: 'Sabit',
    amount: '$50.00',
    type: 'Cash',
    date: 'Oct 22, 2023',
    status: 'Completed',
  },
]

const statusColors = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
}

export default function DonationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Donations (Month)
              </CardTitle>
              <DollarSign className='h-4 w-4 text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>৳850</div>
            </CardContent>
          </Card>
          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Donors (Month)
              </CardTitle>
              <Users className='h-4 w-4 text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>12</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Donations Table and Add Form */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <Card className='lg:col-span-2 bg-white shadow-sm'>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>
                        <Badge variant='outline'>{donation.type}</Badge>
                      </TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[
                              donation.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {donation.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add Donation Form */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle>Add New Donation</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form onSubmit={handleAddDonation}>
                <div className='space-y-2'>
                  <Label htmlFor='donorName'>Donor Name</Label>
                  <Input id='donorName' placeholder="Enter donor's full name" />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='type'>Donation Type</Label>
                  <Select>
                    <SelectTrigger id='type'>
                      <SelectValue placeholder='Cash' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cash'>Cash</SelectItem>
                      <SelectItem value='goods'>Goods</SelectItem>
                      <SelectItem value='service'>Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='amount'>Amount / Quantity</Label>
                  <Input
                    id='amount'
                    placeholder='৳ e.g., 100.00 or 5 blankets'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='date'>Donation Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-start'
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {format(date || new Date(), 'PPP')}
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
                  <Label htmlFor='notes'>Notes (Optional)</Label>
                  <Input
                    id='notes'
                    placeholder='Any specific details about the donation'
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full bg-orange-500 hover:bg-orange-600'
                >
                  + Add Donation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
