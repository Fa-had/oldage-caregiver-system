export type UserRole = 'admin' | 'resident_care' | 'cook'

export interface User {
  id: number
  name: string
  email: string
  passwordHash: string
  role: UserRole
}

export interface Resident {
  id: number
  userId: number
  age: number
  roomNo: string
  medicalNotes: string
  contactPerson: string
}

export interface Appointment {
  id: number
  visitorName: string
  residentId?: number
  purpose: string
  datetime: Date
  status: 'pending' | 'approved' | 'rejected' | 'completed'
}

export interface Meal {
  id?: number
  residentId: number
  requestedByStaffId?: number
  date: string
  type: 'breakfast' | 'lunch' | 'dinner'
  quantity?: number
  spicy?: boolean
  sugarFree?: boolean
  saltFree?: boolean
  notes?: string
  status?: 'pending' | 'prepared' | 'delivered'
}

export interface Staff {
  id: number
  userId: number
  assignedResidentId: number
}

export interface Notice {
  id: number
  type: string
  message: string
  sender_name: string | null
  sender_role: string | null
  created_at: string
}

export interface Donation {
  id: number
  donorName: string
  amount: number
  status: 'pending' | 'completed'
  createdAt: Date
}

export interface Finance {
  id: number
  type: 'income' | 'expense'
  amount: number
  source: string
  date: Date
}
export interface ContributionData {
  amount: number
  contributionType: 'one-time' | 'monthly'
  name: string
  email: string
  phoneNumber: string
  paymentMethod: 'credit-debit' | 'mobile-banking' | 'bank-transfer'
}

export interface ContributionResponse {
  success: boolean
  message: string
  contributionId?: string
}
