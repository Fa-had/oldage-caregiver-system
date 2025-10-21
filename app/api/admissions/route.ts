import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
import path from 'path'
import fs from 'fs/promises'

async function saveImage(file: File): Promise<string | null> {
  if (!file) return null
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadDir, { recursive: true })
  const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`)
  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, buffer)
  return `/uploads/${path.basename(filePath)}`
}

export async function POST(req: NextRequest) {
  try {
    const pool = await getPool()
    const formData = await req.formData()

    const formFilledBy = formData.get('formFilledBy') as string
    const fullName = formData.get('fullName') as string
    const nid = formData.get('nid') as string
    const age = Number(formData.get('age'))
    const gender = formData.get('gender') as string
    const contact = formData.get('contact') as string
    const email = formData.get('email') as string
    const image = formData.get('image') as File
    const imagePath = image ? await saveImage(image) : null

    const medicalConditions = formData.get('medicalConditions')
      ? JSON.parse(formData.get('medicalConditions') as string)
      : null
    const symptoms = formData.get('symptoms')
      ? JSON.parse(formData.get('symptoms') as string)
      : null
    const takingMedication = formData.get('takingMedication') as string
    const medicationDetails = formData.get('medicationDetails') as string
    const medicationAllergies = formData.get('medicationAllergies') as string
    const allergyDetails = formData.get('allergyDetails') as string
    const illegalDrugUse = formData.get('illegalDrugUse') as string
    const alcoholFrequency = formData.get('alcoholFrequency') as string
    const guardianName = formData.get('guardianName') as string
    const guardianNid = formData.get('guardianNid') as string
    const guardianContact = formData.get('guardianContact') as string
    const guardianEmail = formData.get('guardianEmail') as string

    const [availableRooms] = await pool.query(
      `SELECT id, occupied, capacity FROM rooms WHERE status = 'Available' AND occupied < capacity ORDER BY id ASC LIMIT 1`
    )

    if ((availableRooms as any[]).length === 0) {
      return NextResponse.json(
        { error: 'No available rooms found' },
        { status: 400 }
      )
    }

    const room = (availableRooms as any)[0]

    const [residentResult]: any = await pool.query(
      `INSERT INTO residents (resident_code, full_name, age, gender, joining_date, room_id, status)
       VALUES (?, ?, ?, ?, CURDATE(), ?, 'Active')`,
      [`R${Date.now().toString().slice(-4)}`, fullName, age, gender, room.id]
    )

    const residentId = residentResult.insertId

    await pool.query(
      `UPDATE rooms
       SET occupied = occupied + 1,
           status = CASE WHEN occupied + 1 >= capacity THEN 'Full' ELSE 'Available' END
       WHERE id = ?`,
      [room.id]
    )

    await pool.query(
      `INSERT INTO admissions (
        resident_id, form_filled_by, full_name, nid, age, gender, contact, email, image_path,
        medical_conditions, symptoms, taking_medication, medication_details,
        medication_allergies, allergy_details, illegal_drug_use, alcohol_frequency,
        guardian_name, guardian_nid, guardian_contact, guardian_email
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        residentId,
        formFilledBy,
        fullName,
        nid,
        age,
        gender,
        contact,
        email,
        imagePath,
        JSON.stringify(medicalConditions),
        JSON.stringify(symptoms),
        takingMedication,
        medicationDetails,
        medicationAllergies,
        allergyDetails,
        illegalDrugUse,
        alcoholFrequency,
        guardianName,
        guardianNid,
        guardianContact,
        guardianEmail,
      ]
    )

    return NextResponse.json(
      { message: 'Admission created successfully' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating admission:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function GET(req: NextRequest) {
  try {
    const pool = await getPool()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''

    // Query to fetch all admissions with resident + room info
    const [rows] = await pool.query(
      `
      SELECT 
        a.id AS admission_id,
        a.full_name AS applicant_name,
        a.form_filled_by,
        a.gender,
        a.age,
        a.contact,
        a.email,
        a.image_path,
        a.created_at,
        r.id AS resident_id,
        r.full_name AS resident_name,
        r.status AS resident_status,
        rm.room_number,
        rm.capacity,
        rm.occupied
      FROM admissions a
      LEFT JOIN residents r ON a.resident_id = r.id
      LEFT JOIN rooms rm ON r.room_id = rm.id
      WHERE a.full_name LIKE ? OR r.full_name LIKE ?
      ORDER BY a.created_at DESC
      `,
      [`%${search}%`, `%${search}%`]
    )

    return NextResponse.json(rows)
  } catch (error: any) {
    console.error('Error fetching admissions:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
