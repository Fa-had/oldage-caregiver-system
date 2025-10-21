// app/api/meals/update-status/route.ts
import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { mealId, status } = body

    if (!mealId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing parameters' },
        { status: 400 }
      )
    }

    const pool = await getPool()
    const [result]: any = await pool.execute(
      `UPDATE meals SET status = ?, updated_at = NOW() WHERE id = ?`,
      [status, mealId]
    )

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Meal not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error updating meal status:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to update status' },
      { status: 500 }
    )
  }
}
