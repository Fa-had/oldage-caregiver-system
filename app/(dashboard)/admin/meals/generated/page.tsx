'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

const generatedMeals = [
  {
    id: 1,
    itemName: 'Chicken curry',
    specialType: 'Spicy',
    quantity: 10,
    status: 'Active',
  },
  {
    id: 2,
    itemName: 'Chicken curry',
    specialType: 'Non Spicy',
    quantity: 20,
    status: 'Active',
  },
  {
    id: 3,
    itemName: 'Khicuri',
    specialType: 'Salty',
    quantity: 30,
    status: 'Active',
  },
  {
    id: 4,
    itemName: 'Khicuri',
    specialType: 'Non-salty',
    quantity: 21,
    status: 'Active',
  },
  {
    id: 5,
    itemName: 'Egg',
    specialType: 'Fry',
    quantity: 57,
    status: 'Active',
  },
  {
    id: 6,
    itemName: 'Rice',
    specialType: 'Regular',
    quantity: 45,
    status: 'Active',
  },
  {
    id: 7,
    itemName: 'Vegetable curry',
    specialType: 'Low Sodium',
    quantity: 35,
    status: 'Active',
  },
]

const statusColors = {
  Active: 'bg-green-100 text-green-800 border-green-200',
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Completed: 'bg-gray-100 text-gray-800 border-gray-200',
}

const specialTypeColors = {
  Spicy: 'bg-red-100 text-red-800',
  'Non Spicy': 'bg-green-100 text-green-800',
  Salty: 'bg-blue-100 text-blue-800',
  'Non-salty': 'bg-purple-100 text-purple-800',
  Fry: 'bg-orange-100 text-orange-800',
  Regular: 'bg-gray-100 text-gray-800',
  'Low Sodium': 'bg-indigo-100 text-indigo-800',
}

export default function GeneratedMealsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMeals = generatedMeals.filter(
    (meal) =>
      meal.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.specialType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        {/* Header with Search and Add Button */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='relative w-full sm:w-64'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              placeholder='Search meals...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <Button className='bg-orange-500 hover:bg-orange-600'>
            <Plus className='mr-2 h-4 w-4' />
            Add Meal Item
          </Button>
        </div>

        {/* Stats Card */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              Generated Meal Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>112</div>
                <div className='text-sm text-gray-600'>Total Items</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>7</div>
                <div className='text-sm text-gray-600'>Unique Items</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>100%</div>
                <div className='text-sm text-gray-600'>Active Items</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meals Table */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              Meal Items List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Special Type</TableHead>
                    <TableHead className='text-right'>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMeals.map((meal) => (
                    <TableRow key={meal.id}>
                      <TableCell className='font-medium'>
                        {meal.itemName}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${
                            specialTypeColors[
                              meal.specialType as keyof typeof specialTypeColors
                            ] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {meal.specialType}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='font-medium'>{meal.quantity}</div>
                        <div className='text-sm text-gray-500'>portions</div>
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
                      <TableCell className='text-right space-x-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0 text-red-600 hover:text-red-800'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredMeals.length === 0 && (
                <div className='text-center py-8 text-gray-500'>
                  No meal items found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
