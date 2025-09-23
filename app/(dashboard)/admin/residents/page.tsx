import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit2 } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

const residents = [
  {
    id: 'R001',
    name: 'Abul Kalam',
    age: 78,
    gender: 'Male',
    caregiver: 'Rahim Khan',
    joiningDate: '2022-01-15',
  },
  {
    id: 'R002',
    name: 'Fatema Begum',
    age: 82,
    gender: 'Female',
    caregiver: 'Fatima Akter',
    joiningDate: '2022-03-01',
  },
  {
    id: 'R003',
    name: 'Jamal Uddin',
    age: 75,
    gender: 'Male',
    caregiver: 'Karim Sheikh',
    joiningDate: '2022-05-20',
  },
  {
    id: 'R004',
    name: 'Ayesha Siddika',
    age: 85,
    gender: 'Female',
    caregiver: 'Rahima Begum',
    joiningDate: '2022-06-11',
  },
  {
    id: 'R006',
    name: 'Shamsun Nahar',
    age: 77,
    gender: 'Female',
    caregiver: 'Fatima Akter',
    joiningDate: '2022-09-18',
  },
  {
    id: 'R007',
    name: 'Abdul Hamid',
    age: 88,
    gender: 'Male',
    caregiver: 'Karim Sheikh',
    joiningDate: '2023-01-05',
  },
  {
    id: 'R008',
    name: 'Rokeya Khatun',
    age: 79,
    gender: 'Female',
    caregiver: 'Rahima Begum',
    joiningDate: '2023-02-14',
  },
  {
    id: 'R009',
    name: 'Nazrul Islam',
    age: 81,
    gender: 'Male',
    caregiver: 'Rahim Khan',
    joiningDate: '2023-04-01',
  },
  {
    id: 'R010',
    name: 'Jahanara Imam',
    age: 86,
    gender: 'Female',
    caregiver: 'Fatima Akter',
    joiningDate: '2023-05-10',
  },
]

export default function ResidentsPage() {
  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-gray-900'>Resident List</h2>
          <Button className='bg-orange-500 hover:bg-orange-600'>
            + Add New Resident
          </Button>
        </div>

        <div className='rounded-md border bg-white'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Caregiver</TableHead>
                <TableHead className='text-right'>Joining Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className='font-medium'>{resident.id}</TableCell>
                  <TableCell>{resident.name}</TableCell>
                  <TableCell>{resident.age}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        resident.gender === 'Male' ? 'default' : 'secondary'
                      }
                    >
                      {resident.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>{resident.caregiver}</TableCell>
                  <TableCell className='text-right'>
                    {resident.joiningDate}
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='sm'>
                      <Edit2 className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
