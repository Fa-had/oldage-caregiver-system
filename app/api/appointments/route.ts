import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  const pool = await getPool()
  try {
    const [rows] = await pool.query(
      'SELECT * FROM appointments ORDER BY appointment_time DESC'
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { visitorName, residentId, purpose, datetime, status } =
      await req.json()
    const pool = await getPool()

    await pool.query(
      `INSERT INTO appointments (visitor_name, resident_id, purpose, appointment_time, status)
       VALUES (?, ?, ?, ?, ?)`,
      [visitorName, residentId || null, purpose, datetime, status || 'pending']
    )

    return NextResponse.json(
      { message: 'Appointment created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}
