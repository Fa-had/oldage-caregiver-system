'use client'

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
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'
import { useState } from 'react'

const financeRecords = [
  {
    date: 'Aug 8, 2025',
    category: 'Income',
    description: 'Donation from Nahid',
    amount: '+৳ 500.00',
    method: 'Bank Transfer',
  },
  {
    date: 'Aug 7, 2025',
    category: 'Expense',
    description: 'Medical Supplies Purchase',
    amount: '-৳ 250.75',
    method: 'Card',
  },
  {
    date: 'Aug 6, 2025',
    category: 'Expense',
    description: '- July Staff Salary',
    amount: '-৳ 1,200.00',
    method: 'Bank Transfer',
  },
  {
    date: 'Aug 5, 2025',
    category: 'Income',
    description: 'Donation from Forhad',
    amount: '+৳ 100.00',
    method: 'Cash',
  },
  {
    date: 'Aug 4, 2025',
    category: 'Expense',
    description: 'Utilities Bill',
    amount: '-৳ 150.00',
    method: 'Card',
  },
]

export default function FinancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Total Amount</CardTitle>
              <TrendingUp className='h-4 w-4 text-green-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>৳ 12,500</div>
            </CardContent>
          </Card>
          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Total Expenses</CardTitle>
              <TrendingDown className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>৳ 8,200</div>
            </CardContent>
          </Card>
          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Net Balance</CardTitle>
              <DollarSign className='h-4 w-4 text-blue-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>৳ 4,300</div>
            </CardContent>
          </Card>
          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Pending Payments</CardTitle>
              <AlertCircle className='h-4 w-4 text-yellow-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>3 payments</div>
            </CardContent>
          </Card>
        </div>

        {/* Finance Records and Add Transaction */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <Card className='lg:col-span-2 bg-white shadow-sm'>
            <CardHeader>
              <CardTitle>Finance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financeRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.category === 'Income'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {record.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell
                        className={
                          record.amount.startsWith('+')
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {record.amount}
                      </TableCell>
                      <TableCell>{record.method}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add Transaction Form */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form onSubmit={handleAddTransaction}>
                <div className='space-y-2'>
                  <Label htmlFor='type'>Transaction Type</Label>
                  <Select defaultValue='income'>
                    <SelectTrigger id='type'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='income'>Income</SelectItem>
                      <SelectItem value='expense'>Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='date'>Date</Label>
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
                  <Label htmlFor='category'>Category</Label>
                  <Select defaultValue='donation'>
                    <SelectTrigger id='category'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='donation'>Donation</SelectItem>
                      <SelectItem value='medical'>Medical</SelectItem>
                      <SelectItem value='staff'>Staff Salary</SelectItem>
                      <SelectItem value='utilities'>Utilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='amount'>Amount</Label>
                  <Input id='amount' type='number' placeholder='৳ 0.00' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='method'>Payment Method</Label>
                  <Select defaultValue='cash'>
                    <SelectTrigger id='method'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cash'>Cash</SelectItem>
                      <SelectItem value='card'>Card</SelectItem>
                      <SelectItem value='bank'>Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='notes'>Notes</Label>
                  <Textarea id='notes' placeholder='Additional notes...' />
                </div>
                <Button
                  type='submit'
                  className='w-full bg-orange-500 hover:bg-orange-600'
                >
                  Save Transaction
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
