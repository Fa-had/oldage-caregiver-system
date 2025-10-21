import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const [rows] = await pool.query('SELECT * FROM finance ORDER BY date DESC')
    return NextResponse.json(rows)
  } catch (error: any) {
    console.error('Error fetching finance:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const pool = await getPool()
    const data = await req.json()
    const { type, category, description, amount, payment_method, date, notes } =
      data

    const [result]: any = await pool.query(
      `INSERT INTO finance (type, category, description, amount, payment_method, date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [type, category, description, amount, payment_method, date, notes]
    )

    return NextResponse.json({ id: result.insertId, ...data })
  } catch (error: any) {
    console.error('Error creating finance:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
