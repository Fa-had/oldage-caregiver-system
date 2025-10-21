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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import DashboardLayout from '@/components/dashboard-layout'
import { Spinner } from '@/components/ui/spinner'

type Donation = {
  id: number
  donor_name: string
  amount: number
  type: string
  notes?: string
  status: string
  createdAt: string
}

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    donor_name: '',
    amount: '',
    type: 'cash',
    notes: '',
  })

  useEffect(() => {
    fetchDonations()
  }, [])

  async function fetchDonations() {
    setLoading(true)
    const res = await fetch('/api/donations')
    const data = await res.json()
    console.log('donation: ', data)

    setDonations(data)
    setLoading(false)
  }

  async function handleAddDonation(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ donor_name: '', amount: '', type: 'cash', notes: '' })
    fetchDonations()
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/donations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchDonations()
  }

  async function deleteDonation(id: number) {
    await fetch(`/api/donations/${id}`, { method: 'DELETE' })
    fetchDonations()
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Donations Table */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.length > 0 ? (
                    donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>{donation.donor_name}</TableCell>
                        <TableCell>{donation.amount}</TableCell>
                        <TableCell>{donation.type}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              statusColors[
                                donation.status.toLowerCase() as keyof typeof statusColors
                              ]
                            }
                          >
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className='space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              updateStatus(donation.id, 'completed')
                            }
                          >
                            Complete
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => updateStatus(donation.id, 'pending')}
                          >
                            Pending
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => deleteDonation(donation.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align='center' colSpan={8}>
                        <Spinner />
                        Loading...
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add Donation Form */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle>Add New Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDonation} className='space-y-4'>
              <div>
                <Label>Donor Name</Label>
                <Input
                  value={form.donor_name}
                  onChange={(e) =>
                    setForm({ ...form, donor_name: e.target.value })
                  }
                  placeholder="Enter donor's name"
                />
              </div>
              <div>
                <Label>Donation Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='cash'>Cash</SelectItem>
                    <SelectItem value='goods'>Goods</SelectItem>
                    <SelectItem value='service'>Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Amount / Quantity</Label>
                <Input
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder='৳ e.g., 100.00 or 5 blankets'
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
    </DashboardLayout>
  )
}
