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

const mealOptions = [
  { value: 'standard', label: 'Standard Meal' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'special-diet', label: 'Special Diet' },
]

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      date: format(date || new Date(), 'yyyy-MM-dd'),
      breakfast,
      lunch,
      dinner,
      specialType,
    })
    router.push('/admin/meals/generated')
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='max-w-2xl space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Generate Meal Plan
          </h2>
          <p className='text-sm text-gray-600'>
            Create meal plan for the selected date
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-6 bg-white p-6 rounded-lg shadow-sm border'
        >
          {/* Meal Selection Row */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='breakfast' className='text-sm font-medium'>
                Breakfast
              </Label>
              <Select value={breakfast} onValueChange={setBreakfast}>
                <SelectTrigger id='breakfast'>
                  <SelectValue placeholder='Select Breakfast Menu' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='bread-egg'>Bread & Egg</SelectItem>
                  <SelectItem value='paratha-curry'>Paratha & Curry</SelectItem>
                  <SelectItem value='khicuri'>Khicuri</SelectItem>
                  <SelectItem value='oats-fruit'>Oats & Fruit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='lunch' className='text-sm font-medium'>
                Lunch
              </Label>
              <Select value={lunch} onValueChange={setLunch}>
                <SelectTrigger id='lunch'>
                  <SelectValue placeholder='Select Lunch Menu' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='rice-meat'>Rice & Meat</SelectItem>
                  <SelectItem value='rice-fish'>Rice & Fish</SelectItem>
                  <SelectItem value='rice-vegetable'>
                    Rice & Vegetable
                  </SelectItem>
                  <SelectItem value='dal-rice'>Dal & Rice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='dinner' className='text-sm font-medium'>
                Dinner
              </Label>
              <Select value={dinner} onValueChange={setDinner}>
                <SelectTrigger id='dinner'>
                  <SelectValue placeholder='Select Dinner Menu' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='rice-vegetable'>
                    Rice & Vegetable
                  </SelectItem>
                  <SelectItem value='roti-curry'>Roti & Curry</SelectItem>
                  <SelectItem value='soup-bread'>Soup & Bread</SelectItem>
                  <SelectItem value='khichuri'>Khichuri</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Special Type and Date */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='specialType' className='text-sm font-medium'>
                Special Type
              </Label>
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

            <div className='space-y-2'>
              <Label htmlFor='date' className='text-sm font-medium'>
                Date
              </Label>
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
          </div>

          {/* Submit Button */}
          <div className='flex justify-end pt-4'>
            <Button
              type='submit'
              size='lg'
              className='bg-orange-500 hover:bg-orange-600 px-8'
            >
              Generate Meal
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
