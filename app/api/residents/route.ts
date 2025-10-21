import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = (page - 1) * limit

    const pool = await getPool()

    const [[{ total }]]: any = await pool.query(
      `SELECT COUNT(*) as total FROM residents WHERE full_name LIKE ?`,
      [`%${search}%`]
    )

    const [rows]: any = await pool.query(
      `
      SELECT 
          r.id,
          r.resident_code AS residentCode,
          r.full_name AS fullName,
          r.age,
          r.gender,
          s.full_name AS caregiverName,
          r.joining_date AS joiningDate,
          r.status
        FROM residents r
        LEFT JOIN staff s ON r.caregiver_id = s.id
        WHERE r.full_name LIKE ?
        ORDER BY r.id DESC
        LIMIT ? OFFSET ?;
      `,
      [`%${search}%`, limit, offset]
    )

    return NextResponse.json({
      data: rows,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    console.error('Error fetching residents:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const pool = await getPool()
    const {
      residentCode,
      fullName,
      age,
      gender,
      caregiver_id,
      joiningDate,
      status = 'Active',
    } = body

    if (!fullName || !age || !gender || !joiningDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const [result]: any = await pool.query(
      `
      INSERT INTO residents (
        resident_code, full_name, age, gender, caregiver_id, joining_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        residentCode,
        fullName,
        age,
        gender,
        caregiver_id || null,
        joiningDate,
        status,
      ]
    )

    return NextResponse.json({ success: true, id: result.insertId })
  } catch (err) {
    console.error('Error adding resident:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const pool = await getPool()
    console.log('Body: ', body)

    const { id, fullName, age, gender, caregiverId, status = 'Active' } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    await pool.query(
      `
      UPDATE residents
      SET full_name = ?, age = ?, gender = ?, caregiver_id = ?, status = ?
      WHERE id = ?
      `,
      [fullName, age, gender, caregiverId || null, status, id]
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error updating resident:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    const pool = await getPool()
    await pool.query('DELETE FROM residents WHERE id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error deleting resident:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
