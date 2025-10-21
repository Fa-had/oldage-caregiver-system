import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const pool = await getPool()
    const search = req.nextUrl.searchParams.get('search') || ''
    const [rows] = await pool.query(
      `
      SELECT m.*, r.room_id, u.full_name AS residentName
      FROM medical_records m
      JOIN residents r ON m.resident_id = r.id
      JOIN users u ON r.id = u.id
      WHERE u.full_name LIKE ?
      ORDER BY m.date DESC
      `,
      [`%${search}%`]
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch records' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      residentId,
      date,
      temperature,
      bloodPressure,
      heartRate,
      oxygenLevel,
      condition,
      notes,
    } = body

    const pool = await getPool()
    await pool.query(
      `INSERT INTO medical_records 
      (residentId, date, temperature, bloodPressure, heartRate, oxygenLevel, condition, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        residentId,
        date,
        temperature,
        bloodPressure,
        heartRate,
        oxygenLevel,
        condition,
        notes,
      ]
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to add record' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id,
      temperature,
      bloodPressure,
      heartRate,
      oxygenLevel,
      condition,
      notes,
    } = body

    const pool = await getPool()
    await pool.query(
      `UPDATE medical_records 
       SET temperature=?, bloodPressure=?, heartRate=?, oxygenLevel=?, condition=?, notes=? 
       WHERE id=?`,
      [temperature, bloodPressure, heartRate, oxygenLevel, condition, notes, id]
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update record' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const pool = await getPool()
    await pool.query('DELETE FROM medical_records WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete record' },
      { status: 500 }
    )
  }
}
