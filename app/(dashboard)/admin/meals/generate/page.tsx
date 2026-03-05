'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'

const specialTypes = [
  { value: 'regular', label: 'Regular' },
  { value: 'low-sodium', label: 'Low Sodium' },
  { value: 'diabetic', label: 'Diabetic Friendly' },
  { value: 'soft-food', label: 'Soft Food' },
]

export default function GenerateMealPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [breakfast, setBreakfast] = useState('')
  const [lunch, setLunch] = useState('')
  const [dinner, setDinner] = useState('')
  const [specialType, setSpecialType] = useState('')
  const [quantity, setQuantity] = useState<number>(1)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!breakfast || !lunch || !dinner || !date)
      return alert('All fields are required.')

    setLoading(true)
    const formattedDate = format(date || new Date(), 'yyyy-MM-dd')

    try {
      const mealsData = [
        { type: 'breakfast', items: breakfast, quantity, date: formattedDate },
        { type: 'lunch', items: lunch, quantity, date: formattedDate },
        { type: 'dinner', items: dinner, quantity, date: formattedDate },
      ]

      for (const meal of mealsData) {
        await fetch('/api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: meal.date,
            type: meal.type,
            quantity: meal.quantity,
            notes: specialType,
            status: 'pending',
          }),
        })
      }

      router.push('/admin/meals')
    } catch (error) {
      console.error('Error creating meals:', error)
      alert('Failed to create meals.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='max-w-2xl space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Generate Meal Plan
          </h2>
          <p className='text-sm text-gray-600'>
            Create daily meal plan for residents
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-6 bg-white p-6 rounded-lg shadow-sm border'
        >
          {/* Meal Selection Row */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='breakfast'>Breakfast</Label>
              <Select value={breakfast} onValueChange={setBreakfast}>
                <SelectTrigger id='breakfast'>
                  <SelectValue placeholder='Select Breakfast Menu' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Bread & Egg'>Bread & Egg</SelectItem>
                  <SelectItem value='Paratha & Curry'>
                    Paratha & Curry
                  </SelectItem>
                  <SelectItem value='Khichuri'>Khichuri</SelectItem>
                  <SelectItem value='Oats & Fruit'>Oats & Fruit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='lunch'>Lunch</Label>
              <Select value={lunch} onValueChange={setLunch}>
                <SelectTrigger id='lunch'>
                  <SelectValue placeholder='Select Lunch Menu' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Rice & Meat'>Rice & Meat</SelectItem>
                  <SelectItem value='Rice & Fish'>Rice & Fish</SelectItem>
                  <SelectItem value='Rice & Vegetable'>
                    Rice & Vegetable
                  </SelectItem>
                  <SelectItem value='Dal & Rice'>Dal & Rice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='dinner'>Dinner</Label>
              <Select value={dinner} onValueChange={setDinner}>
                <SelectTrigger id='dinner'>
                  <SelectValue placeholder='Select Dinner Menu' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Rice & Vegetable'>
                    Rice & Vegetable
                  </SelectItem>
                  <SelectItem value='Roti & Curry'>Roti & Curry</SelectItem>
                  <SelectItem value='Soup & Bread'>Soup & Bread</SelectItem>
                  <SelectItem value='Khichuri'>Khichuri</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quantity and Special Type */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='quantity'>Quantity</Label>
              <Input
                id='quantity'
                type='number'
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='specialType'>Special Type</Label>
              <Select value={specialType} onValueChange={setSpecialType}>
                <SelectTrigger id='specialType'>
                  <SelectValue placeholder='Select Type' />
                </SelectTrigger>
                <SelectContent>
                  {specialTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Picker */}
          <div className='space-y-2'>
            <Label htmlFor='date'>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {format(date || new Date(), 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end pt-4'>
            <Button
              type='submit'
              size='lg'
              className='bg-orange-500 hover:bg-orange-600 px-8'
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Meal'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
