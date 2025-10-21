import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json()
  const pool = await getPool()
  await pool.query('UPDATE donations SET status = ? WHERE id = ?', [
    status,
    params.id,
  ])
  return NextResponse.json({ message: 'Status updated' })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const pool = await getPool()
  await pool.query('DELETE FROM donations WHERE id = ?', [params.id])
  return NextResponse.json({ message: 'Donation deleted' })
}
