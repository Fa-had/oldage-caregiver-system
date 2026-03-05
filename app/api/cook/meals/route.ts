// app/api/meals/route.ts
import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date =
      searchParams.get('date') || new Date().toISOString().slice(0, 10)

    const pool = await getPool()

    // TODO: Replace with actual cook user ID (session)
    const cookId = 1

    const [rows]: any = await pool.execute(
      `
      SELECT 
        m.id,
        m.date,
        m.type,
        m.status,
        m.notes,
        r.full_name AS resident_full_name
      FROM meals m
      JOIN residents r ON m.resident_id = r.id
      WHERE m.date = ?
      ORDER BY r.full_name
      `,
      [date]
    )

    return NextResponse.json(rows)
  } catch (err) {
    console.error('Error fetching meals:', err)
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    )
  }
}
