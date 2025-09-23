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
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Coffee, Soup, Moon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, Eye } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'
import Link from 'next/link'

const mealTypes = [
  { name: 'Breakfast', count: 20, icon: Coffee, color: 'bg-blue-500' },
  { name: 'Lunch', count: 30, icon: Soup, color: 'bg-green-500' },
  { name: 'Dinner', count: 20, icon: Moon, color: 'bg-purple-500' },
]

const meals = [
  {
    id: 1,
    date: '2023-10-27',
    type: 'Breakfast',
    category: 'Breakfast',
    items: 'Chicken curry, Khicuri, Egg',
    status: 'Active',
  },
  {
    id: 2,
    date: '2023-10-27',
    type: 'Lunch',
    category: 'Lunch',
    items: 'Rice, Meat',
    status: 'Active',
  },
  {
    id: 3,
    date: '2023-10-27',
    type: 'Dinner',
    category: 'Dinner',
    items: 'Rice, Vegetable',
    status: 'Active',
  },
  {
    id: 4,
    date: '2023-10-26',
    type: 'Breakfast',
    category: 'Breakfast',
    items: 'Bread, Egg',
    status: 'Active',
  },
  {
    id: 5,
    date: '2023-10-26',
    type: 'Lunch',
    category: 'Lunch',
    items: 'Rice, Fish',
    status: 'Active',
  },
]

const statusColors = {
  Active: 'bg-green-100 text-green-800 border-green-200',
  Planned: 'bg-blue-100 text-blue-800 border-blue-200',
  Completed: 'bg-gray-100 text-gray-800 border-gray-200',
}

export default function MealsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Meal Type Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {mealTypes.map((mealType) => (
            <Card key={mealType.name} className='bg-white shadow-sm'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  {mealType.name}
                </CardTitle>
                <mealType.icon
                  className={`h-4 w-4 ${
                    mealType.color === 'bg-blue-500'
                      ? 'text-blue-500'
                      : mealType.color === 'bg-green-500'
                      ? 'text-green-500'
                      : 'text-purple-500'
                  }`}
                />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-gray-900'>
                  {mealType.count} Meals
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meals Table and Generate Button */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Meals Table */}
          <Card className='lg:col-span-2 bg-white shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-lg font-semibold'>
                View Meals
              </CardTitle>
              <div className='flex items-center space-x-2'>
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
              </div>
            </CardHeader>
            <CardContent>
              <div className='rounded-md border bg-white'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Meals</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meals.map((meal) => (
                      <TableRow key={meal.id}>
                        <TableCell className='font-medium'>
                          {meal.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant='outline'
                            className='text-xs capitalize'
                          >
                            {meal.category}
                          </Badge>
                        </TableCell>
                        <TableCell className='max-w-[200px] truncate'>
                          {meal.items}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${
                              statusColors[
                                meal.status as keyof typeof statusColors
                              ]
                            }`}
                          >
                            {meal.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant='ghost' size='sm'>
                            <Eye className='h-4 w-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Generate Meal Card */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Generate Meal
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Button className='w-full bg-orange-500 hover:bg-orange-600'>
                <Link href={'/admin/meals/generate'}>Create Meal</Link>
              </Button>
              {/* <Button className='w-full bg-orange-500 hover:bg-orange-600'>
                <Link href={'/admin/meals/generated'}>Generated Meals</Link>
              </Button> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
