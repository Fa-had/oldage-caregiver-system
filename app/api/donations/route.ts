import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const [rows] = await pool.query(
      'SELECT * FROM donations ORDER BY created_at DESC'
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { donorName, amount, status } = await req.json()
    const pool = await getPool()
    await pool.query(
      'INSERT INTO donations (donorName, amount, status) VALUES (?, ?, ?)',
      [donorName, amount, status || 'pending']
    )
    return NextResponse.json(
      { message: 'Donation added successfully' },
      { status: 201 }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to add donation' },
      { status: 500 }
    )
  }
}
