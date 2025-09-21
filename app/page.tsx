'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Users,
  Award,
  Utensils,
  Stethoscope,
  Clock,
  Home,
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Stories from '@/components/Stories'
import Story from '@/components/Story'

export default function Home_() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gradient-to-b from-orange-50 to-white'>
        {/* Hero Section */}
        <Hero />

        {/* Our Impact in Numbers */}
        <Impact />

        {/* Our Services */}
        <Services />

        {/* Recent Work */}
        <section className='py-20 px-4 bg-white'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
                Recent Work
              </h2>
              <p className='text-xl text-gray-600'>
                Latest projects and initiatives
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <Card className='overflow-hidden border-orange-200 hover:shadow-lg transition-shadow'>
                <div className='h-48 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center'>
                  <Home className='h-20 w-20 text-orange-600' />
                </div>
                <CardHeader>
                  <CardTitle className='text-xl'>
                    New Entertainment Center
                  </CardTitle>
                  <CardDescription>
                    A state-of-the-art facility with games, movies, and social
                    spaces for our residents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant='secondary'
                    className='bg-orange-100 text-orange-800'
                  >
                    Completed
                  </Badge>
                </CardContent>
              </Card>
              <Card className='overflow-hidden border-orange-200 hover:shadow-lg transition-shadow'>
                <div className='h-48 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center'>
                  <Stethoscope className='h-20 w-20 text-orange-600' />
                </div>
                <CardHeader>
                  <CardTitle className='text-xl'>
                    Medical Wing Expansion
                  </CardTitle>
                  <CardDescription>
                    Expanded medical facilities with advanced equipment and more
                    treatment rooms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant='secondary'
                    className='bg-orange-100 text-orange-800'
                  >
                    In Progress
                  </Badge>
                </CardContent>
              </Card>
              <Card className='overflow-hidden border-orange-200 hover:shadow-lg transition-shadow'>
                <div className='h-48 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center'>
                  <Users className='h-20 w-20 text-orange-600' />
                </div>
                <CardHeader>
                  <CardTitle className='text-xl'>
                    Community Garden Project
                  </CardTitle>
                  <CardDescription>
                    A therapeutic garden where seniors can grow plants and enjoy
                    nature.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant='secondary'
                    className='bg-orange-100 text-orange-800'
                  >
                    Planning
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <Work />

        {/* Stories from Our Family */}
        {/* <section className='py-20 px-4 bg-orange-50'>
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
                    "I never thought I'd discover my passion for painting at
                    this age. The staff here encouraged me to try, and now my
                    artwork is displayed in local galleries. This place gave me
                    a new lease on life."
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
                    The Johnson family shares their experience finding the
                    perfect care for their father.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600'>
                    "Finding the right care for our father was overwhelming. The
                    compassion and professionalism here gave us peace of mind.
                    Dad is happier and healthier than he's been in years."
                  </p>
                  <div className='mt-4 text-sm text-gray-500'>
                    - The Johnson Family
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        <Stories />
        <Story />
        {/* Footer */}
        <Footer />
        {/* <footer className='bg-gray-800 text-white py-16 px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
              <div>
                <h3 className='text-xl font-bold mb-4 text-orange-400'>
                  About Us
                </h3>
                <p className='text-gray-300'>
                  Dedicated to providing exceptional care and support for our
                  elderly community members.
                </p>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-4 text-orange-400'>
                  Quick Links
                </h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>
                    <a
                      href='#'
                      className='hover:text-orange-400 transition-colors'
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='hover:text-orange-400 transition-colors'
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='hover:text-orange-400 transition-colors'
                    >
                      Our Work
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='hover:text-orange-400 transition-colors'
                    >
                      Stories
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-4 text-orange-400'>
                  Contact Info
                </h3>
                <div className='space-y-2 text-gray-300'>
                  <div className='flex items-center'>
                    <Phone className='h-4 w-4 mr-2 text-orange-400' />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className='flex items-center'>
                    <Mail className='h-4 w-4 mr-2 text-orange-400' />
                    <span>info@elderlycare.org</span>
                  </div>
                  <div className='flex items-center'>
                    <MapPin className='h-4 w-4 mr-2 text-orange-400' />
                    <span>123 Care Street, Senior City</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-4 text-orange-400'>
                  Newsletter
                </h3>
                <p className='text-gray-300 mb-4'>
                  Stay updated with our latest news and events.
                </p>
                <Button className='bg-orange-600 hover:bg-orange-700 w-full'>
                  Subscribe
                </Button>
              </div>
            </div>
            <div className='border-t border-gray-700 pt-8 text-center text-gray-400'>
              <p>&copy; 2024 Elderly Care Foundation. All rights reserved.</p>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  )
}
