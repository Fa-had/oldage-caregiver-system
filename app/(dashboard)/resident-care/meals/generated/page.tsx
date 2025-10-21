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
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon, Printer, FileText } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import DashboardLayout from '@/components/dashboard-layout'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Meal {
  id: number
  date: string
  type: string
  spicy: boolean
  sugarFree: boolean
  saltFree: boolean
  notes: string | null
  status: string
  quantity?: number
}

export default function GeneratedMealsPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedDate) fetchMeals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate])

  const fetchMeals = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/meals?date=${format(selectedDate || new Date(), 'yyyy-MM-dd')}`
      )
      const data = await res.json()
      setMeals(data)
    } catch (error) {
      console.error('Failed to fetch meals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.text(
      `Meal Plan for ${format(selectedDate || new Date(), 'PPP')}`,
      14,
      15
    )
    const tableData = meals.map((meal) => [
      meal.type,
      meal.notes || '—',
      meal.quantity || '—',
      meal.status,
    ])
    autoTable(doc, {
      head: [['Meal Type', 'Special Type', 'Quantity', 'Status']],
      body: tableData,
      startY: 25,
    })
    doc.save(`meals-${format(selectedDate || new Date(), 'yyyy-MM-dd')}.pdf`)
  }

  const mealTypes = ['breakfast', 'lunch', 'dinner']
  const groupedMeals = mealTypes.map((type) => ({
    type,
    data: meals.filter((meal) => meal.type === type),
  }))

  return (
    <DashboardLayout userRole='resident_care'>
      <div className='space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Generated Meal Summary
          </h2>

          <div className='flex items-center gap-2'>
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

            <Button
              onClick={fetchMeals}
              disabled={loading}
              className='bg-orange-500 hover:bg-orange-600'
            >
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Table Display */}
        {meals.length === 0 ? (
          <Card className='p-8 text-center text-gray-500 bg-white'>
            No meals found for {format(selectedDate || new Date(), 'PPP')}
          </Card>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {groupedMeals.map(
              (group) =>
                group.data.length > 0 && (
                  <Card key={group.type} className='bg-white shadow-sm'>
                    <CardHeader>
                      <CardTitle className='capitalize'>
                        {group.type} ({group.data.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Special Type</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.data.map((meal) => (
                            <TableRow key={meal.id}>
                              <TableCell>{meal.notes || '—'}</TableCell>
                              <TableCell>{meal.quantity || '—'}</TableCell>
                              <TableCell className='capitalize'>
                                {meal.status}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )
            )}
          </div>
        )}

        {/* Actions */}
        {meals.length > 0 && (
          <div className='flex justify-end gap-3'>
            <Button
              variant='outline'
              onClick={handlePrint}
              className='flex items-center gap-2'
            >
              <Printer className='h-4 w-4' /> Print
            </Button>
            <Button
              onClick={handleExportPDF}
              className='bg-orange-500 hover:bg-orange-600 flex items-center gap-2'
            >
              <FileText className='h-4 w-4' /> Export PDF
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
