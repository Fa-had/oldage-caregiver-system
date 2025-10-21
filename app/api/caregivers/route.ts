import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const [rows]: any = await pool.query(`
      SELECT id, full_name AS name FROM staff WHERE role = 'resident_care'
    `)
    return NextResponse.json(rows)
  } catch (err) {
    console.error('Error fetching caregivers:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
