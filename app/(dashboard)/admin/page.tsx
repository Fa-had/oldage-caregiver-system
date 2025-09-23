// import { requireRole } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard-layout'
import BDTSign from '@/components/ui/bdtsign'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Activity,
  AlertTriangle,
  Badge,
  CalendarIcon,
  DollarSign,
  FileText,
  Pill,
  User,
} from 'lucide-react'

const stats = [
  {
    name: 'Total Residents',
    value: '1,250',
    icon: User,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Appointments',
    value: '35',
    icon: CalendarIcon,
    change: '+5%',
    changeType: 'positive',
  },
  {
    name: 'Medication',
    value: '21',
    icon: Pill,
    change: '-2%',
    changeType: 'negative',
  },
]

const healthStats = [
  { name: 'Excellent Health', value: 89, color: 'bg-green-500' },
  { name: 'Good Health', value: 32, color: 'bg-blue-500' },
  { name: 'Fair Health', value: 6, color: 'bg-yellow-500' },
  { name: 'Needs Attention', value: 1, color: 'bg-red-500' },
]

const donationData = [
  { name: 'Guardians', value: 45, color: 'bg-orange-200' },
  { name: 'Donors', value: 28, color: 'bg-orange-300' },
  { name: 'Organizations', value: 15, color: 'bg-orange-400' },
]

const financeData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 15000 },
  { month: 'Mar', amount: 18000 },
  { month: 'Apr', amount: 14000 },
  { month: 'May', amount: 22000 },
  { month: 'Jun', amount: 19000 },
]

export default async function AdminDashboard() {
  // const session = await requireRole(['admin'])

  return (
    <DashboardLayout userRole='admin'>
      <div className='space-y-6'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {stats.map((stat, index) => (
            <Card key={stat.name} className='bg-white shadow-sm'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  {stat.name}
                </CardTitle>
                <stat.icon className='h-4 w-4 text-gray-400' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-gray-900'>
                  {stat.value}
                </div>
                <p className='text-xs text-gray-500 mt-1'>
                  {stat.changeType === 'positive' ? '↑' : '↓'} {stat.change}{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Donation Overview */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                {/* <DollarSign className='h-4 w-4' /> */}
                <BDTSign />
                <span>Donation Overview</span>
              </CardTitle>
              <CardDescription>Recent contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='text-3xl font-bold text-blue-600'>1,24,500</div>
                <div className='flex flex-col space-y-2'>
                  {donationData.map((item) => (
                    <div
                      key={item.name}
                      className='flex items-center justify-between'
                    >
                      <span className='text-sm text-gray-600'>{item.name}</span>
                      <div className='flex items-center space-x-2'>
                        <div
                          className={`h-2 w-20 rounded-full ${item.color}`}
                        />
                        <span className='text-sm font-medium text-gray-900'>
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Overview */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Activity className='h-4 w-4' />
                <span>Health Overview</span>
              </CardTitle>
              <CardDescription>Resident health status</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-2'>
                {healthStats.map((stat) => (
                  <div
                    key={stat.name}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                  >
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        {stat.name}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {stat.value} residents
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ${
                        stat.color === 'bg-red-500'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {stat.value}
                    </Badge>
                  </div>
                ))}
              </div>
              {healthStats[3].value > 0 && (
                <div className='flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg'>
                  <AlertTriangle className='h-4 w-4 text-red-500' />
                  <span className='text-sm text-red-700'>
                    1 resident needs immediate attention
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Finance Overview */}
        <Card className='bg-white shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <FileText className='h-4 w-4' />
              <span>Finance Overview</span>
            </CardTitle>
            <CardDescription>Monthly financial trends</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#f97316" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div> */}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
          <div className='space-y-4'>
            <p className='text-gray-600'>No recent activity</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
