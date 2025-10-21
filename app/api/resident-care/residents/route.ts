// app/api/residents/route.ts
// import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const pool = await getPool()

    // TODO: replace this with real logged-in staff ID from session
    // const session = await getServerSession(authOptions)
    // const staffId = session?.user?.id
    const staffId = 1
    // TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) AS age,
    const [rows]: any = await pool.execute(
      `
      SELECT 
        r.id,
        r.resident_code AS residentCode,
        r.full_name AS fullName,
        r.gender,
        s.full_name AS caregiverName,
        DATE_FORMAT(r.joining_date, '%Y-%m-%d') AS joiningDate,
        r.status
      FROM residents r
      LEFT JOIN staff s ON r.caregiver_id = s.id
      WHERE r.caregiver_id = ?
        AND (r.full_name LIKE ? OR r.resident_code LIKE ?)
      ORDER BY r.joining_date DESC
      `,
      [staffId, `%${search}%`, `%${search}%`]
    )

    return NextResponse.json({ data: rows })
  } catch (error) {
    console.error('Error fetching residents:', error)
    return NextResponse.json(
      { error: 'Failed to load residents' },
      { status: 500 }
    )
  }
}

// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get('id')
//     if (!id) {
//       return NextResponse.json({ error: 'Missing id' }, { status: 400 })
//     }

//     const pool = await getPool()
//     await pool.execute(`DELETE FROM residents WHERE id = ?`, [id])

//     return NextResponse.json({ message: 'Resident deleted successfully' })
//   } catch (error) {
//     console.error('Error deleting resident:', error)
//     return NextResponse.json(
//       { error: 'Failed to delete resident' },
//       { status: 500 }
//     )
//   }
// }
