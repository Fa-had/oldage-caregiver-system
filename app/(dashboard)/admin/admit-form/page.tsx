'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import DashboardLayout from '@/components/dashboard-layout'
import { useRouter } from 'next/navigation'

export default function AdmitFormPage() {
  const router = useRouter()
  // Form State
  const [formFilledBy, setFormFilledBy] = useState('elderly')
  const [fullName, setFullName] = useState('')
  const [nid, setNid] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Medical Conditions and Symptoms
  const medicalConditionsList = [
    'Psychiatric disorder',
    'Epilepsy',
    'Cancer',
    'Diabetes',
    'Other',
  ]
  const symptomsList = [
    'Chest pain',
    'Hematologic',
    'Psychiatric',
    'Respiratory',
    'Cardiovascular',
    'Neurological',
    'Gastrointestinal',
    'Genitourinary',
  ]

  const [medicalConditions, setMedicalConditions] = useState<string[]>([])
  const [symptoms, setSymptoms] = useState<string[]>([])

  // Medication
  const [takingMedication, setTakingMedication] = useState('no')
  const [medicationDetails, setMedicationDetails] = useState('')
  const [medicationAllergies, setMedicationAllergies] = useState('no')
  const [allergyDetails, setAllergyDetails] = useState('')

  // Substance Use
  const [illegalDrugUse, setIllegalDrugUse] = useState('no')
  const [alcoholFrequency, setAlcoholFrequency] = useState('')

  // Guardian Information
  const [guardianName, setGuardianName] = useState('')
  const [guardianNid, setGuardianNid] = useState('')
  const [guardianContact, setGuardianContact] = useState('')
  const [guardianEmail, setGuardianEmail] = useState('')

  // Handle Checkbox Toggle for medical conditions
  const toggleMedicalCondition = (condition: string) => {
    setMedicalConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    )
  }
  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    )
  }

  // Handle file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
    }
  }

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !age || !gender || !contact) {
      alert('Please fill all required fields')
      return
    }

    // Prepare form data
    const formData = new FormData()
    formData.append('formFilledBy', formFilledBy)
    formData.append('fullName', fullName)
    formData.append('nid', nid)
    formData.append('age', age)
    formData.append('gender', gender)
    formData.append('contact', contact)
    formData.append('email', email)
    if (imageFile) formData.append('image', imageFile)
    formData.append('medicalConditions', JSON.stringify(medicalConditions))
    formData.append('symptoms', JSON.stringify(symptoms))
    formData.append('takingMedication', takingMedication)
    formData.append('medicationDetails', medicationDetails)
    formData.append('medicationAllergies', medicationAllergies)
    formData.append('allergyDetails', allergyDetails)
    formData.append('illegalDrugUse', illegalDrugUse)
    formData.append('alcoholFrequency', alcoholFrequency)
    formData.append('guardianName', guardianName)
    formData.append('guardianNid', guardianNid)
    formData.append('guardianContact', guardianContact)
    formData.append('guardianEmail', guardianEmail)

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        alert('Admission form submitted successfully')
        router.push('/admin/residents')
      } else {
        alert('Failed to submit form')
      }
    } catch (error) {
      alert('An error occurred: ' + error)
    }
  }

  return (
    <DashboardLayout userRole='admin'>
      <div className='max-w-2xl space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold'>Admission Form</h2>
          <p className='text-sm text-gray-600'>
            Please fill out all required information for admission
          </p>
        </div>

        <form
          className='space-y-6 bg-white p-6 rounded-lg shadow-sm border'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          {/* Form Filled By */}
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <Label className='text-sm font-medium'>Form Filled By</Label>
              <Select value={formFilledBy} onValueChange={setFormFilledBy}>
                <SelectTrigger className='mt-1'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='elderly'>Elderly Person</SelectItem>
                  <SelectItem value='guardian'>Guardian</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Elderly Person Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
              Elderly Person Information
            </h3>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='fullName' className='text-sm font-medium'>
                  Full Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='fullName'
                  placeholder='Enter full name'
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='nid' className='text-sm font-medium'>
                  NID No. (10 digits)
                </Label>
                <Input
                  id='nid'
                  placeholder='Enter NID number'
                  maxLength={10}
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='age' className='text-sm font-medium'>
                  What is your age? <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='age'
                  type='number'
                  placeholder='Enter age'
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='gender' className='text-sm font-medium'>
                  What is your gender? <span className='text-red-500'>*</span>
                </Label>
                <Select required value={gender} onValueChange={setGender}>
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='male'>Male</SelectItem>
                    <SelectItem value='female'>Female</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='contact' className='text-sm font-medium'>
                  Contact Number <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='contact'
                  placeholder='+880'
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium'>
                  Email Address (Optional)
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className='space-y-2'>
            <Label htmlFor='image' className='text-sm font-medium'>
              Elderly Person Image
            </Label>
            <div className='flex items-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg'>
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center'>
                <span className='text-gray-500'>
                  {imageFile ? imageFile.name : 'Upload'}
                </span>
              </div>
              <div>
                <p className='text-sm text-gray-600'>
                  Upload image of elderly person for identification
                </p>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='mt-2'
                  onClick={() => document.getElementById('image')?.click()}
                >
                  Upload Image
                </Button>
              </div>
            </div>
            <input
              id='image'
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleImageChange}
            />
          </div>

          {/* Medical Conditions */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
              Medical Conditions
            </h3>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Check the conditions that apply to you or any member of your
                immediate family:
              </Label>
              <div className='grid grid-cols-2 gap-2 mt-2'>
                {medicalConditionsList.map((condition) => (
                  <div key={condition} className='flex items-center space-x-2'>
                    <Checkbox
                      id={condition}
                      checked={medicalConditions.includes(condition)}
                      onCheckedChange={() => toggleMedicalCondition(condition)}
                    />
                    <Label
                      htmlFor={condition}
                      className='text-sm cursor-pointer'
                    >
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Check the symptoms that you currently experience:
              </Label>
              <div className='grid grid-cols-2 gap-2 mt-2'>
                {symptomsList.map((symptom) => (
                  <div key={symptom} className='flex items-center space-x-2'>
                    <Checkbox
                      id={symptom}
                      checked={symptoms.includes(symptom)}
                      onCheckedChange={() => toggleSymptom(symptom)}
                    />
                    <Label htmlFor={symptom} className='text-sm cursor-pointer'>
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medication */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
              Medication
            </h3>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Are you currently taking any medication?
              </Label>
              <RadioGroup
                value={takingMedication}
                onValueChange={setTakingMedication}
                className='flex flex-col space-y-2 mt-2'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='yes' id='med-yes' />
                  <Label htmlFor='med-yes' className='text-sm cursor-pointer'>
                    Yes
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='no' id='med-no' />
                  <Label htmlFor='med-no' className='text-sm cursor-pointer'>
                    No
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='unsure' id='med-unsure' />
                  <Label
                    htmlFor='med-unsure'
                    className='text-sm cursor-pointer'
                  >
                    Not sure
                  </Label>
                </div>
              </RadioGroup>
              <Textarea
                placeholder='Please list them...'
                className='mt-2'
                value={medicationDetails}
                onChange={(e) => setMedicationDetails(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Do you have any medication allergies?
              </Label>
              <RadioGroup
                value={medicationAllergies}
                onValueChange={setMedicationAllergies}
                className='flex flex-col space-y-2 mt-2'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='yes' id='allergy-yes' />
                  <Label
                    htmlFor='allergy-yes'
                    className='text-sm cursor-pointer'
                  >
                    Yes
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='no' id='allergy-no' />
                  <Label
                    htmlFor='allergy-no'
                    className='text-sm cursor-pointer'
                  >
                    No
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='unsure' id='allergy-unsure' />
                  <Label
                    htmlFor='allergy-unsure'
                    className='text-sm cursor-pointer'
                  >
                    Not sure
                  </Label>
                </div>
              </RadioGroup>
              <Textarea
                placeholder='Please list them...'
                className='mt-2'
                value={allergyDetails}
                onChange={(e) => setAllergyDetails(e.target.value)}
              />
            </div>
          </div>

          {/* Substance Use */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
              Substance Use
            </h3>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Do you use any illegal drugs or have you ever used them?
              </Label>
              <Select value={illegalDrugUse} onValueChange={setIllegalDrugUse}>
                <SelectTrigger className='mt-1'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='no'>No</SelectItem>
                  <SelectItem value='yes'>Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                How often do you consume alcohol?
              </Label>
              <div className='space-y-2 mt-2'>
                <RadioGroup
                  value={alcoholFrequency}
                  onValueChange={setAlcoholFrequency}
                >
                  {['Daily', 'Weekly', 'Monthly', 'Occasionally', 'Never'].map(
                    (frequency) => (
                      <div
                        key={frequency}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem
                          value={frequency.toLowerCase()}
                          id={`alcohol-${frequency.toLowerCase()}`}
                        />
                        <Label
                          htmlFor={`alcohol-${frequency.toLowerCase()}`}
                          className='text-sm cursor-pointer'
                        >
                          {frequency}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
              Guardian Information (Optional)
            </h3>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='guardianName' className='text-sm font-medium'>
                  Full Name
                </Label>
                <Input
                  id='guardianName'
                  placeholder='Enter guardian name'
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='guardianNid' className='text-sm font-medium'>
                  NID No.
                </Label>
                <Input
                  id='guardianNid'
                  placeholder='Enter NID number'
                  value={guardianNid}
                  onChange={(e) => setGuardianNid(e.target.value)}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='guardianContact'
                  className='text-sm font-medium'
                >
                  Contact Number
                </Label>
                <Input
                  id='guardianContact'
                  placeholder='+880'
                  value={guardianContact}
                  onChange={(e) => setGuardianContact(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='guardianEmail' className='text-sm font-medium'>
                  Email Address
                </Label>
                <Input
                  id='guardianEmail'
                  type='email'
                  placeholder='Enter email address'
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button type='submit' className='w-full'>
            Submit Admission Form
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
