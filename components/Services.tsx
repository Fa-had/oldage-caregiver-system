import { Clock, Heart, Home, Stethoscope, Users, Utensils } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function Services() {
  return (
    <section className='py-20 px-4 bg-orange-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Our Services
          </h2>
          <p className='text-xl text-gray-600'>
            Comprehensive care for our beloved seniors
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Clock className='h-10 w-10 text-orange-600 mb-4' />
              <CardTitle className='text-xl'>24/7 Nursing Care</CardTitle>
              <CardDescription>
                Round-the-clock medical attention and support from qualified
                nursing staff.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Home className='h-10 w-10 text-orange-600 mb-4' />
              <CardTitle className='text-xl'>Assisted Living</CardTitle>
              <CardDescription>
                Comfortable living spaces with daily assistance for independent
                seniors.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Stethoscope className='h-10 w-10 text-orange-600 mb-4' />
              <CardTitle className='text-xl'>Medical Services</CardTitle>
              <CardDescription>
                On-site medical care, regular check-ups, and health monitoring.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Utensils className='h-10 w-10 text-orange-600 mb-4' />
              <CardTitle className='text-xl'>Nutritional Meals</CardTitle>
              <CardDescription>
                Healthy, delicious meals prepared by professional nutritionists.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Users className='h-10 w-10 text-orange-600 mb-4' />
              <CardTitle className='text-xl'>Social Activities</CardTitle>
              <CardDescription>
                Engaging social events and recreational activities for mental
                wellness.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <Heart className='h-10 w-10 text-orange-600 mb-4' />
              <CardTitle className='text-xl'>Emotional Support</CardTitle>
              <CardDescription>
                Counseling and emotional support for seniors and their families.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
