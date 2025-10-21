'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { ContributionData, ContributionResponse } from '@/types/index'

export default function ContributionForm() {
  const [formData, setFormData] = useState<ContributionData>({
    amount: 0,
    contributionType: 'one-time',
    name: '',
    email: '',
    phoneNumber: '',
    paymentMethod: 'credit-debit',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleContributionTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      contributionType: value as 'one-time' | 'monthly',
    }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value as
        | 'credit-debit'
        | 'mobile-banking'
        | 'bank-transfer',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/contribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result: ContributionResponse = await response.json()

      if (result.success) {
        setMessage('Thank you for your contribution!')
        // Reset form
        setFormData({
          amount: 0,
          contributionType: 'one-time',
          name: '',
          email: '',
          phoneNumber: '',
          paymentMethod: 'credit-debit',
        })
      } else {
        setMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h1 className='text-2xl font-bold mb-6 text-gray-900'>
        Make a Contribution
      </h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Amount */}
        <div>
          <Label htmlFor='amount' className='text-gray-700 mb-2 block'>
            Select Amount
          </Label>
          <Input
            id='amount'
            name='amount'
            type='number'
            value={formData.amount || ''}
            onChange={handleInputChange}
            placeholder='Enter amount'
            min='1'
            required
            className='w-full'
          />
        </div>

        {/* Contribution Type */}
        <div>
          <Label className='text-gray-700 mb-3 block'>Contribution Type</Label>
          <RadioGroup
            value={formData.contributionType}
            onValueChange={handleContributionTypeChange}
            className='flex gap-6'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='one-time' id='one-time' />
              <Label htmlFor='one-time' className='cursor-pointer'>
                One-Time
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='monthly' id='monthly' />
              <Label htmlFor='monthly' className='cursor-pointer'>
                Monthly
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Name */}
        <div>
          <Label htmlFor='name' className='text-gray-700 mb-2 block'>
            Name
          </Label>
          <Input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Enter your full name'
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor='email' className='text-gray-700 mb-2 block'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Enter your email address'
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor='phoneNumber' className='text-gray-700 mb-2 block'>
            Phone Number
          </Label>
          <Input
            id='phoneNumber'
            name='phoneNumber'
            type='tel'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder='Enter your phone number'
            required
          />
        </div>

        {/* Payment Method */}
        <div>
          <Label className='text-gray-700 mb-3 block'>Payment Method</Label>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={handlePaymentMethodChange}
            className='space-y-3'
          >
            <div className='flex items-center space-x-2 p-3 border rounded-md'>
              <RadioGroupItem value='credit-debit' id='credit-debit' />
              <Label htmlFor='credit-debit' className='cursor-pointer'>
                Credit/Debit Card
              </Label>
            </div>
            <div className='flex items-center space-x-2 p-3 border rounded-md'>
              <RadioGroupItem value='mobile-banking' id='mobile-banking' />
              <Label htmlFor='mobile-banking' className='cursor-pointer'>
                Mobile Banking
              </Label>
            </div>
            <div className='flex items-center space-x-2 p-3 border rounded-md'>
              <RadioGroupItem value='bank-transfer' id='bank-transfer' />
              <Label htmlFor='bank-transfer' className='cursor-pointer'>
                Bank Transfer
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-base'
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Contribute Now'}
        </Button>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-md text-center ${
              message.includes('Thank you')
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  )
}
