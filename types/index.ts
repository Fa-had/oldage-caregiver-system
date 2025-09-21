export type UserRole = 'admin' | 'resident' | 'staff' | 'cook' | 'visitor'

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
  id: number
  residentId: number
  date: Date
  type: 'breakfast' | 'lunch' | 'dinner'
  spicy: boolean
  sugarFree: boolean
  saltFree: boolean
  notes?: string
  status: 'pending' | 'prepared' | 'delivered'
}

export interface Staff {
  id: number
  userId: number
  assignedResidentId: number
}

export interface Notice {
  id: number
  title: string
  content: string
  publishDate: Date
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
