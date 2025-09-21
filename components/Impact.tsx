import { Award, Stethoscope, Users, Utensils } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function Impact() {
  return (
    <section className='py-20 px-4 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Our Impact in Numbers
          </h2>
          <p className='text-xl text-gray-600'>
            Making a difference, one senior at a time
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <Card className='text-center border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Users className='h-12 w-12 text-orange-600 mx-auto mb-4' />
              <CardTitle className='text-3xl font-bold text-orange-600'>
                200+
              </CardTitle>
              <CardDescription className='text-lg'>
                Active Residents
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='text-center border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Award className='h-12 w-12 text-orange-600 mx-auto mb-4' />
              <CardTitle className='text-3xl font-bold text-orange-600'>
                30+
              </CardTitle>
              <CardDescription className='text-lg'>Awards</CardDescription>
            </CardHeader>
          </Card>
          <Card className='text-center border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Utensils className='h-12 w-12 text-orange-600 mx-auto mb-4' />
              <CardTitle className='text-3xl font-bold text-orange-600'>
                10M+
              </CardTitle>
              <CardDescription className='text-lg'>
                Meals Served
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='text-center border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Stethoscope className='h-12 w-12 text-orange-600 mx-auto mb-4' />
              <CardTitle className='text-3xl font-bold text-orange-600'>
                160+
              </CardTitle>
              <CardDescription className='text-lg'>
                Expert Doctors
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
