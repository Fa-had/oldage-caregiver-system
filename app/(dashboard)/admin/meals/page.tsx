'use client'

import { useEffect, useState } from 'react'
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
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, Eye, Edit, Trash2 } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  prepared: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
}

export default function MealsPage() {
  const [meals, setMeals] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [editingMeal, setEditingMeal] = useState<any | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchMeals() {
    const formattedDate = selectedDate
      ? format(selectedDate, 'yyyy-MM-dd')
      : undefined
    const res = await fetch(
      formattedDate ? `/api/meals?date=${formattedDate}` : '/api/meals'
    )
    const data = await res.json()
    setMeals(data)
  }

  useEffect(() => {
    fetchMeals()
  }, [selectedDate])

  async function handleUpdate() {
    setLoading(true)
    await fetch(`/api/meals/${editingMeal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: editingMeal.type,
        quantity: editingMeal.quantity,
        notes: editingMeal.notes,
        status: editingMeal.status,
      }),
    })
    setEditingMeal(null)
    fetchMeals()
    setLoading(false)
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/meals/${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    fetchMeals()
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Meals Overview</h2>
          <Button className='bg-orange-500 hover:bg-orange-600'>
            <Link href={'/admin/meals/generate'}>Generate Meal</Link>
          </Button>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='w-[240px] justify-start text-left font-normal'
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {format(selectedDate || new Date(), 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle>Meals List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meals.length > 0 &&
                  meals.map((meal) => (
                    <TableRow key={meal.id}>
                      <TableCell>{meal.date}</TableCell>
                      <TableCell className='capitalize'>{meal.type}</TableCell>
                      <TableCell>{meal.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[
                              meal.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {meal.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='flex space-x-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => setEditingMeal(meal)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => setDeleteId(meal.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {meals.length === 0 && (
              <p className='p-4 text-center text-gray-500'>
                No meals found for this date.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={!!editingMeal} onOpenChange={() => setEditingMeal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Meal</DialogTitle>
            </DialogHeader>
            {editingMeal && (
              <div className='space-y-3'>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={editingMeal.type}
                    onValueChange={(v) =>
                      setEditingMeal({ ...editingMeal, type: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='breakfast'>Breakfast</SelectItem>
                      <SelectItem value='lunch'>Lunch</SelectItem>
                      <SelectItem value='dinner'>Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type='number'
                    value={editingMeal.quantity}
                    onChange={(e) =>
                      setEditingMeal({
                        ...editingMeal,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Notes</Label>
                  <Input
                    value={editingMeal.notes || ''}
                    onChange={(e) =>
                      setEditingMeal({ ...editingMeal, notes: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={editingMeal.status}
                    onValueChange={(v) =>
                      setEditingMeal({ ...editingMeal, status: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='pending'>Pending</SelectItem>
                      <SelectItem value='prepared'>Prepared</SelectItem>
                      <SelectItem value='delivered'>Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this meal?</p>
            <DialogFooter>
              <Button variant='outline' onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant='destructive' onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
