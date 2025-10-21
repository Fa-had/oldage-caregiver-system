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

interface FinanceRecord {
  id: number
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  payment_method: string
  date: string
  notes?: string
}

export default function FinancePage() {
  const [records, setRecords] = useState<FinanceRecord[]>([])
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: 'income',
    category: '',
    amount: '',
    payment_method: 'cash',
    description: '',
    notes: '',
  })

  // Fetch all records from backend
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/finance')
      const data = await res.json()
      console.log('record: ', data)

      setRecords(data)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const newRecord = {
      ...form,
      amount: parseFloat(form.amount),
      date: date
        ? format(date, 'yyyy-MM-dd')
        : format(new Date(), 'yyyy-MM-dd'),
    }

    const res = await fetch('/api/finance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    })

    if (res.ok) {
      const added = await res.json()
      setRecords((prev) => [added, ...prev])
      setForm({
        type: 'income',
        category: '',
        amount: '',
        payment_method: 'cash',
        description: '',
        notes: '',
      })
    } else {
      alert('Failed to add transaction')
    }

    setLoading(false)
  }

  const totalIncome =
    records.length > 0
      ? records
          .filter((r) => r.type === 'income')
          .reduce((sum, r) => Number(sum) + Number(r.amount), 0)
      : 0
  const totalExpense =
    records.length > 0
      ? records
          .filter((r) => r.type === 'expense')
          ?.reduce((sum, r) => Number(sum) + Number(r.amount), 0)
      : 0
  const netBalance = totalIncome - totalExpense
  console.log('Total Income: ', totalIncome)
  console.log('Total Expense: ', totalExpense)

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Total Income</CardTitle>
              <TrendingUp className='h-4 w-4 text-green-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-green-600'>
                ৳ {totalIncome.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Total Expense</CardTitle>
              <TrendingDown className='h-4 w-4 text-red-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-red-600'>
                ৳ {totalExpense.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Net Balance</CardTitle>
              <DollarSign className='h-4 w-4 text-blue-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ৳ {netBalance.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-sm'>Total Records</CardTitle>
              <AlertCircle className='h-4 w-4 text-yellow-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{records.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Finance Records Table */}
          <Card className='lg:col-span-2 bg-white shadow-sm'>
            <CardHeader>
              <CardTitle>Finance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.length > 0 &&
                    records.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{format(new Date(r.date), 'PPP')}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              r.type === 'income'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {r.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{r.category}</TableCell>
                        <TableCell>{r.description}</TableCell>
                        <TableCell
                          className={
                            r.type === 'income'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {r.type === 'income' ? '+' : '-'}৳ {r.amount}
                        </TableCell>
                        <TableCell>{r.payment_method}</TableCell>
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
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-3'>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(val) => setForm({ ...form, type: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='income'>Income</SelectItem>
                      <SelectItem value='expense'>Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Category</Label>
                  <Input
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    placeholder='e.g., Donation or Utilities'
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Input
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder='Transaction details'
                  />
                </div>

                <div>
                  <Label>Amount</Label>
                  <Input
                    type='number'
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    placeholder='৳ 0.00'
                  />
                </div>

                <div>
                  <Label>Date</Label>
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

                <div>
                  <Label>Payment Method</Label>
                  <Select
                    value={form.payment_method}
                    onValueChange={(val) =>
                      setForm({ ...form, payment_method: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cash'>Cash</SelectItem>
                      <SelectItem value='card'>Card</SelectItem>
                      <SelectItem value='bank'>Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder='Additional notes...'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-orange-500 hover:bg-orange-600'
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Transaction'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
