import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const pool = await getPool()
    const date = req.nextUrl.searchParams.get('date')
    const query = date
      ? 'SELECT * FROM meals WHERE date = ? ORDER BY id DESC'
      : 'SELECT * FROM meals ORDER BY date DESC'
    const [rows] = await pool.query(query, date ? [date] : [])
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { residentId, date, type, quantity, notes } = await req.json()
    console.log('ResidentId: ', residentId)

    const pool = await getPool()
    await pool.query(
      `INSERT INTO meals (resident_id, date, type, quantity, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [residentId, date, type, quantity, notes]
    )
    return NextResponse.json(
      { message: 'Meal added successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to add meal' }, { status: 500 })
  }
}
