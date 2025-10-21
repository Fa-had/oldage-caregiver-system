import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    const cookId = 1 // temporary

    // Count today's meals
    const [todayMeals]: any = await connection.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE date = CURDATE()
      `
    )

    // Count tomorrow's meals
    const [tomorrowMeals]: any = await connection.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE date = CURDATE() + INTERVAL 1 DAY
      `
    )

    // Count prepared meals
    const [preparedMeals]: any = await connection.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE status = 'prepared' AND date = CURDATE()
      `
    )

    // Count pending meals
    const [pendingMeals]: any = await connection.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE status = 'pending' AND date = CURDATE()
      `
    )

    // Latest notices (joined with staff to get name and role)
    const [notices]: any = await connection.execute(
      `
      SELECT n.id, n.type, n.message, s.full_name AS sender_name, s.role AS sender_role, n.created_at
      FROM notices n
      JOIN staff s ON n.created_by = s.id
      ORDER BY n.created_at DESC
      LIMIT 5
      `
    )

    await connection.end()

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
