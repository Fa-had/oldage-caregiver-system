import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

// GET ALL STAFF
export async function GET() {
  try {
    const pool = await getPool()
    const [rows] = await pool.query(`SELECT * FROM staff ORDER BY id DESC`)
    return NextResponse.json(rows)
  } catch (error: any) {
    console.error('Error fetching staff:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// CREATE STAFF
export async function POST(req: NextRequest) {
  try {
    const pool = await getPool()
    const { full_name, role, work_hours, contact, email } = await req.json()

    if (!full_name || !role || !contact) {
      return NextResponse.json(
        { error: 'Full name, role, and contact are required.' },
        { status: 400 }
      )
    }

    const [result] = await pool.query(
      `INSERT INTO staff (full_name, role, work_hours, contact, email) VALUES (?, ?, ?, ?, ?)`,
      [full_name, role, work_hours || null, contact, email || null]
    )

    return NextResponse.json({ id: (result as any).insertId, success: true })
  } catch (error: any) {
    console.error('Error creating staff:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// UPDATE STAFF
export async function PUT(req: NextRequest) {
  try {
    const pool = await getPool()
    const { id, full_name, role, work_hours, contact, email, status } =
      await req.json()

    if (!id)
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 })

    await pool.query(
      `UPDATE staff 
       SET full_name=?, role=?, work_hours=?, contact=?, email=?, status=? 
       WHERE id=?`,
      [full_name, role, work_hours, contact, email, status || 'active', id]
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating staff:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

//DELETE STAFF
export async function DELETE(req: NextRequest) {
  try {
    const pool = await getPool()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID missing' }, { status: 400 })

    await pool.query(`DELETE FROM staff WHERE id = ?`, [id])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting staff:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
