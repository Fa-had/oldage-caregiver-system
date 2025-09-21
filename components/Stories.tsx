import { BookOpen, Heart } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export default function Stories() {
  return (
    <section className='py-20 px-4 bg-orange-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Stories from Our Family
          </h2>
          <p className='text-xl text-gray-600'>
            Heartwarming stories from our residents and their families
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='text-xl flex items-center'>
                <BookOpen className='h-6 w-6 text-orange-600 mr-2' />
                Margaret's Journey
              </CardTitle>
              <CardDescription className='text-base'>
                At 85, Margaret found new purpose through our art therapy
                program.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600'>
                "I never thought I'd discover my passion for painting at this
                age. The staff here encouraged me to try, and now my artwork is
                displayed in local galleries. This place gave me a new lease on
                life."
              </p>
              <div className='mt-4 text-sm text-gray-500'>
                - Margaret, Resident since 2019
              </div>
            </CardContent>
          </Card>
          <Card className='border-orange-200 hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='text-xl flex items-center'>
                <Heart className='h-6 w-6 text-orange-600 mr-2' />A Family's
                Gratitude
              </CardTitle>
              <CardDescription className='text-base'>
                The Johnson family shares their experience finding the perfect
                care for their father.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600'>
                "Finding the right care for our father was overwhelming. The
                compassion and professionalism here gave us peace of mind. Dad
                is happier and healthier than he's been in years."
              </p>
              <div className='mt-4 text-sm text-gray-500'>
                - The Johnson Family
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
