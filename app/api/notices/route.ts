import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const [rows] = await pool.query(`
      SELECT 
        n.id,
        n.type,
        n.message,
        n.created_at,
        n.updated_at,
        s.full_name AS created_by
      FROM notices n
      LEFT JOIN staff s ON n.created_by = s.id
      ORDER BY n.created_at DESC
    `)
    return NextResponse.json(rows)
  } catch (error: any) {
    console.error('Error fetching notices:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const pool = await getPool()
    const { type, message, created_by } = await req.json()

    if (!type || !message || !created_by)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )

    const [result] = await pool.query(
      `INSERT INTO notices (type, message, created_by) VALUES (?, ?, ?)`,
      [type, message, created_by]
    )

    return NextResponse.json({ id: (result as any).insertId, success: true })
  } catch (error: any) {
    console.error('Error creating notice:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const pool = await getPool()
    const { id, type, message } = await req.json()

    if (!id)
      return NextResponse.json({ error: 'Missing notice ID' }, { status: 400 })

    await pool.query(`UPDATE notices SET type=?, message=? WHERE id=?`, [
      type,
      message,
      id,
    ])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating notice:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const pool = await getPool()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

    await pool.query(`DELETE FROM notices WHERE id = ?`, [id])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting notice:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
