import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const { type, quantity, notes, status } = await req.json()
    const pool = await getPool()

    await pool.query(
      `UPDATE meals SET type=?, quantity=?, notes=?, status=? WHERE id=?`,
      [type, quantity, notes, status, id]
    )

    return NextResponse.json({ message: 'Meal updated successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update meal' },
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
    await pool.query('DELETE FROM meals WHERE id=?', [id])
    return NextResponse.json({ message: 'Meal deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete meal' },
      { status: 500 }
    )
  }
}
