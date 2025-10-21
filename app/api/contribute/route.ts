import { NextRequest, NextResponse } from 'next/server'
import type { ContributionData, ContributionResponse } from '@/types/index'

export async function POST(request: NextRequest) {
  try {
    const body: ContributionData = await request.json()

    // Validation
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json<ContributionResponse>(
        { success: false, message: 'Please enter a valid amount' },
        { status: 400 }
      )
    }

    if (!body.name || !body.email || !body.phoneNumber) {
      return NextResponse.json<ContributionResponse>(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ContributionResponse>(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Simulate payment processing
    // In a real application, you would:
    // 1. Validate payment details
    // 2. Process payment with payment gateway (Stripe, PayPal, etc.)
    // 3. Store contribution data in database
    // 4. Send confirmation email

    console.log('Processing contribution:', body)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a mock contribution ID
    const contributionId = `CONT_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`

    // In a real app, you would save to database here
    // await saveContribution({ ...body, contributionId, createdAt: new Date() })

    return NextResponse.json<ContributionResponse>(
      {
        success: true,
        message: 'Your contribution has been processed successfully!',
        contributionId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contribution processing error:', error)
    return NextResponse.json<ContributionResponse>(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
