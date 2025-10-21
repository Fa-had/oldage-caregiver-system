import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  const pool = await getPool()
  try {
    const [
      [residents],
      [appointments],
      [meals],
      [donations],
      [finance],
      [health],
      [rooms],
    ] = await Promise.all([
      pool.query<any>(
        `SELECT COUNT(*) AS total FROM residents WHERE status='Active'`
      ),
      pool.query<any>(
        `SELECT COUNT(*) AS total FROM appointments WHERE status='pending'`
      ),
      pool.query<any>(
        `SELECT COUNT(*) AS total FROM meals WHERE status='pending'`
      ),
      pool.query<any>(
        `SELECT SUM(amount) AS totalAmount, COUNT(*) AS totalDonations FROM donations WHERE status='completed'`
      ),
      pool.query<any>(`
        SELECT MONTH(date) AS month, SUM(amount) AS total
        FROM finance
        WHERE type='income'
        GROUP BY MONTH(date)
        ORDER BY MONTH(date)
      `),
      pool.query<any>(`
        SELECT 'condition', COUNT(*) AS count
        FROM medical_records
        GROUP BY 'condition'
      `),
      pool.query<any>(`
        SELECT COUNT(*) AS totalRooms,
               SUM(CASE WHEN status='Full' THEN 1 ELSE 0 END) AS fullRooms
        FROM rooms
      `),
    ])

    return NextResponse.json({
      residents: residents[0].total,
      appointments: appointments[0].total,
      pendingMeals: meals[0].total,
      donations: donations[0],
      finance: finance,
      healthStats: health,
      rooms: rooms[0],
    })
  } catch (error) {
    console.error('Dashboard Error:', error)
    return NextResponse.json(
      { error: 'Failed to load dashboard data', code: 'Failed' },
      { status: 500 }
    )
  }
}
