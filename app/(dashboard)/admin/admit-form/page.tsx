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

export default function AdmitFormPage() {
  return (
    <DashboardLayout userRole='admin'>
      <div className='max-w-2xl space-y-6'>
        {/* Form Header */}
        <div className='space-y-2'>
          <h2 text-2xl font-bold>
            Admission Form
          </h2>
          <p className='text-sm text-gray-600'>
            Please fill out all required information for admission
          </p>
        </div>

        <form className='space-y-6 bg-white p-6 rounded-lg shadow-sm border'>
          {/* Form Filler Selection */}
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <Label className='text-sm font-medium'>Form Filled By</Label>
              <Select defaultValue='elderly'>
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
                <Input id='fullName' placeholder='Enter full name' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='nid' className='text-sm font-medium'>
                  NID No. (10 digits)
                </Label>
                <Input id='nid' placeholder='Enter NID number' maxLength={10} />
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
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='gender' className='text-sm font-medium'>
                  What is your gender? <span className='text-red-500'>*</span>
                </Label>
                <Select required>
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
                <Input id='contact' placeholder='+880' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium'>
                  Email Address (Optional)
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter email address'
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
                <span className='text-gray-500'>Upload</span>
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
                >
                  Upload Image
                </Button>
              </div>
            </div>
            <input id='image' type='file' className='hidden' accept='image/*' />
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
                {[
                  'Psychiatric disorder',
                  'Epilepsy',
                  'Cancer',
                  'Diabetes',
                  'Other',
                ].map((condition) => (
                  <div key={condition} className='flex items-center space-x-2'>
                    <Checkbox id={condition} />
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
                {[
                  'Chest pain',
                  'Hematologic',
                  'Psychiatric',
                  'Respiratory',
                  'Cardiovascular',
                  'Neurological',
                  'Gastrointestinal',
                  'Genitourinary',
                ].map((symptom) => (
                  <div key={symptom} className='flex items-center space-x-2'>
                    <Checkbox id={symptom} />
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
                defaultValue='no'
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
              <Textarea placeholder='Please list them...' className='mt-2' />
            </div>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Do you have any medication allergies?
              </Label>
              <RadioGroup
                defaultValue='no'
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
              <Textarea placeholder='Please list them...' className='mt-2' />
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
              <Select defaultValue='no'>
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
                <RadioGroup>
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
                <Input id='guardianName' placeholder='Enter guardian name' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='guardianNid' className='text-sm font-medium'>
                  NID No.
                </Label>
                <Input id='guardianNid' placeholder='Enter NID number' />
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
                <Input id='guardianContact' placeholder='+880' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='guardianEmail' className='text-sm font-medium'>
                  Email (Optional)
                </Label>
                <Input
                  id='guardianEmail'
                  type='email'
                  placeholder='Enter email address'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end pt-6'>
            <Button
              type='submit'
              size='lg'
              className='bg-orange-500 hover:bg-orange-600 px-8'
            >
              Confirm Admit
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
