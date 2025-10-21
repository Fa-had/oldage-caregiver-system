// app/api/medical/route.ts
import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db' // adjust to "@/app/api/db" if your helper is there

// --- GET medical records (assigned residents only) ---
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const pool = await getPool()

    // TODO: Replace with logged-in staff id from session
    const staffId = 1

    const [rows]: any = await pool.execute(
      `
      SELECT 
        m.id,
        m.residentId,
        r.full_name AS residentName,
        DATE_FORMAT(m.date, '%Y-%m-%d') AS date,
        m.temperature,
        m.blood_pressure AS bloodPressure,
        m.heart_rate AS heartRate,
        m.oxygen_level AS oxygenLevel,
        m.condition,
        m.notes
      FROM medical_records m
      JOIN residents r ON m.residentId = r.id
      WHERE r.caregiver_id = ?
        AND (r.full_name LIKE ? OR r.resident_code LIKE ?)
      ORDER BY m.date DESC
      `,
      [staffId, `%${search}%`, `%${search}%`]
    )

    return NextResponse.json(rows)
  } catch (err) {
    console.error('Error fetching medical records:', err)
    return NextResponse.json(
      { error: 'Failed to fetch medical records' },
      { status: 500 }
    )
  }
}

// --- POST new record ---
export async function POST(request: Request) {
  try {
    const body = await request.json()
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

    if (!residentId || !date)
      return NextResponse.json(
        { error: 'Resident ID and Date are required' },
        { status: 400 }
      )

    const pool = await getPool()

    // TODO: Replace with logged-in staff id from session
    const staffId = 1

    await pool.execute(
      `
      INSERT INTO medical_records 
      (residentId, staffId, date, temperature, blood_pressure, heart_rate, oxygen_level, condition, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        residentId,
        staffId,
        date,
        temperature || null,
        bloodPressure || null,
        heartRate || null,
        oxygenLevel || null,
        condition || 'normal',
        notes || '',
      ]
    )

    return NextResponse.json({ message: 'Medical record added successfully' })
  } catch (err) {
    console.error('Error adding medical record:', err)
    return NextResponse.json(
      { error: 'Failed to add medical record' },
      { status: 500 }
    )
  }
}

// --- PUT update record ---
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      date,
      temperature,
      bloodPressure,
      heartRate,
      oxygenLevel,
      condition,
      notes,
    } = body

    if (!id)
      return NextResponse.json({ error: 'Missing record ID' }, { status: 400 })

    const pool = await getPool()
    const [result]: any = await pool.execute(
      `
      UPDATE medical_records
      SET 
        date = ?, 
        temperature = ?, 
        blood_pressure = ?, 
        heart_rate = ?, 
        oxygen_level = ?, 
        condition = ?, 
        notes = ?
      WHERE id = ?
      `,
      [
        date,
        temperature,
        bloodPressure,
        heartRate,
        oxygenLevel,
        condition,
        notes,
        id,
      ]
    )

    if (result.affectedRows === 0)
      return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    return NextResponse.json({ message: 'Record updated successfully' })
  } catch (err) {
    console.error('Error updating record:', err)
    return NextResponse.json(
      { error: 'Failed to update medical record' },
      { status: 500 }
    )
  }
}

// --- DELETE record ---
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const pool = await getPool()
    const [result]: any = await pool.execute(
      `DELETE FROM medical_records WHERE id = ?`,
      [id]
    )

    if (result.affectedRows === 0)
      return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    return NextResponse.json({ message: 'Record deleted successfully' })
  } catch (err) {
    console.error('Error deleting record:', err)
    return NextResponse.json(
      { error: 'Failed to delete medical record' },
      { status: 500 }
    )
  }
}
