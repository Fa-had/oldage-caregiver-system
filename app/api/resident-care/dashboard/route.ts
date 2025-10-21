// app/api/resident-care/dashboard/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPool } from '@/lib/db' // adjust path if your db helper is somewhere else
import { Notice } from '@/types'

// type Notice = {
//   id: number
//   type: string
//   message: string
//   sender_name: string | null
//   sender_role: string | null
//   created_at: string
// }

type DashboardData = {
  residentCount: number
  mealsToday: number
  medicalToday: number
  latestNotices: Notice[]
}

export async function GET(_req: NextRequest) {
  let pool
  try {
    pool = await getPool()

    // TODO: replace this with the actual logged-in staff id from your session/auth.
    // e.g. const staffId = req.session.user.id
    const staffId = 1

    // Count assigned residents
    const [residentRows]: any = await pool.execute(
      `SELECT COUNT(*) AS count FROM residents WHERE caregiver_id = ?`,
      [staffId]
    )

    // Meals created today (for assigned residents)
    const [mealRows]: any = await pool.execute(
      `
      SELECT COUNT(*) AS count
      FROM meals
      WHERE date = CURDATE()
        AND resident_id IN (SELECT id FROM residents WHERE caregiver_id = ?)
      `,
      [staffId]
    )

    // Medical logs created today (for assigned residents)
    const [medicalRows]: any = await pool.execute(
      `
      SELECT COUNT(*) AS count
      FROM medical_records
      WHERE date = CURDATE()
        AND resident_id IN (SELECT id FROM residents WHERE caregiver_id = ?)
      `,
      [staffId]
    )

    // Latest notices (limit 5) — include sender info if available
    const [noticeRows]: any = await pool.execute(
      `
      SELECT n.id, n.type, n.message, n.sender_name, n.sender_role, n.created_at
      FROM notices n
      ORDER BY n.created_at DESC
      LIMIT 5
      `
    )

    const data: DashboardData = {
      residentCount: residentRows?.[0]?.count ?? 0,
      mealsToday: mealRows?.[0]?.count ?? 0,
      medicalToday: medicalRows?.[0]?.count ?? 0,
      latestNotices: (noticeRows || []).map((r: any) => ({
        id: r.id,
        type: r.type,
        message: r.message,
        sender_name: r.sender_name ?? null,
        sender_role: r.sender_role ?? null,
        created_at: r.created_at?.toISOString?.() ?? String(r.created_at),
      })),
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Resident Care Dashboard Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
