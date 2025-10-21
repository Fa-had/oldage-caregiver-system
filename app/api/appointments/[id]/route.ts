import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { status } = await req.json()
    const pool = await getPool()
    await pool.query('UPDATE appointments SET status = ? WHERE id = ?', [
      status,
      id,
    ])
    return NextResponse.json({ message: 'Appointment updated successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const pool = await getPool()
    await pool.query('DELETE FROM appointments WHERE id = ?', [id])
    return NextResponse.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    )
  }
}
