import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
export async function GET() {
  try {
    const pool = await getPool()
    const cookId = 1

    // Count today's meals
    const [todayMeals]: any = await pool.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE date = CURDATE()
      `
    )

    // Count tomorrow's meals
    const [tomorrowMeals]: any = await pool.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE date = CURDATE() + INTERVAL 1 DAY
      `
    )

    // Count prepared meals
    const [preparedMeals]: any = await pool.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE status = 'prepared' AND date = CURDATE()
      `
    )

    // Count pending meals
    const [pendingMeals]: any = await pool.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE status = 'pending' AND date = CURDATE()
      `
    )

    // Latest notices (joined with staff to get name and role)
    const [notices]: any = await pool.execute(
      `
      SELECT n.id, n.type, n.message, s.full_name AS sender_name, s.role AS sender_role, n.created_at
      FROM notices n
      JOIN staff s ON n.created_by = s.id
      ORDER BY n.created_at DESC
      LIMIT 5
      `
    )

    return NextResponse.json({
      todayMeals: todayMeals[0]?.count || 0,
      tomorrowMeals: tomorrowMeals[0]?.count || 0,
      preparedMeals: preparedMeals[0]?.count || 0,
      pendingMeals: pendingMeals[0]?.count || 0,
      latestNotices: notices || [],
    })
  } catch (error) {
    console.error('MySQL Cook Dashboard Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cook dashboard data' },
      { status: 500 }
    )
  }
}
