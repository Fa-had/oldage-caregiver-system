# Oldage Caregiver System

A comprehensive web-based management system for elderly care facilities, designed to streamline resident care, staff coordination, medical records, meal planning, and facility operations.

## Overview

The Oldage Caregiver System is a modern, full-stack application built to help care facilities efficiently manage day-to-day operations. It provides role-based dashboards for administrators, staff members, cooks, and residents, enabling seamless communication and care coordination.

## Features

### Core Functionality

- **Resident Management**: Track resident information, medical history, room assignments, and care status
- **Staff Management**: Manage staff profiles, roles, work hours, and assignments
- **Medical Records**: Maintain comprehensive medical histories and health monitoring
- **Meal Planning & Management**: Schedule meals, track dietary requirements, and manage meal preparation
- **Appointments**: Schedule and manage resident healthcare and facility appointments
- **Donations**: Track financial contributions and manage donation campaigns
- **Notices & Announcements**: Post updates for staff and residents
- **Finance Tracking**: Monitor facility expenses and financial transactions

### User Roles & Access Control

- **Admin Dashboard**: Full system access, resident and staff management, finance tracking
- **Resident Care Dashboard**: Medical records, meal planning, resident monitoring
- **Cook Dashboard**: Meal management, dietary requirements, meal status updates
- **Residents Portal**: Access to personal information, meal schedules, notices, and appointments

### Technical Features

- Role-based authentication and authorization
- Real-time data updates
- Export functionality (PDF generation)
- Responsive design for desktop and mobile devices
- Secure password hashing and session management

## Tech Stack

### Frontend

- **Framework**: [Next.js 15.5](https://nextjs.org) with TypeScript
- **UI Components**: [Radix UI](https://radix-ui.com) with custom styling
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Charts**: [Recharts](https://recharts.org)
- **Date Handling**: [date-fns](https://date-fns.org)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) with [jsPDF AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)

### Backend

- **Runtime**: Node.js with Next.js API Routes
- **Authentication**: [NextAuth v4](https://next-auth.js.org)
- **Database**: [MySQL 2](https://github.com/sidorares/node-mysql2)
- **ORM**: [Prisma](https://www.prisma.io)
- **Security**: [bcryptjs](https://github.com/dcodeIO/bcryptjs)
- **JWT**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

### Development

- **TypeScript 5**
- **Tailwind CSS PostCSS 4**
- **Turbopack** for fast builds and development

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn, pnpm, bun)
- **MySQL**: v8.0 or higher
- **Git**: For version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Fa-had/oldage-caregiver-system
cd oldage-caregiver-system
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=elderly_care

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Database URL (for Prisma)
DATABASE_URL="mysql://user:password@localhost:3306/elderly_care"
```

### 4. Set Up the Database

#### Option 1: Using SQL Files

```bash
# Connect to MySQL
mysql -u your_username -p

# Source the schema and seed files
mysql -u your_username -p elderly_care < database/schema.sql
mysql -u your_username -p elderly_care < database/seed.sql
```

#### Option 2: Using Prisma

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

The development server uses Turbopack for fast rebuilds and hot module replacement.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
oldage-caregiver-system/
├── app/                           # Next.js app directory
│   ├── api/                       # API routes
│   │   ├── admissions/           # Resident admission endpoints
│   │   ├── appointments/         # Appointment management
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── caregivers/           # Caregiver management
│   │   ├── cook/                 # Cook dashboard & meal endpoints
│   │   ├── donations/            # Donation tracking
│   │   ├── finance/              # Finance management
│   │   ├── meals/                # Meal planning & management
│   │   ├── medical/              # Medical records
│   │   ├── notices/              # Announcements & notices
│   │   ├── resident-care/        # Resident care operations
│   │   ├── residents/            # Resident management
│   │   └── staff/                # Staff management
│   ├── (auth)/                   # Authentication pages
│   ├── (dashboard)/              # Dashboard pages (role-based)
│   ├── appointments/             # Public appointments page
│   ├── contribute/               # Donation/contribution page
│   ├── donation/                 # Donation tracking page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Client context providers
├── components/                   # Reusable React components
│   ├── ui/                      # UI component library (Radix UI)
│   ├── Dashboard-layout.tsx     # Dashboard wrapper
│   ├── Navbar.tsx               # Navigation bar
│   ├── Hero.tsx                 # Hero section
│   ├── Impact.tsx               # Impact statistics
│   ├── Services.tsx             # Services overview
│   ├── Stories.tsx              # Testimonials
│   └── Footer.tsx               # Footer component
├── database/                     # Database files
│   ├── schema.sql               # Database schema
│   └── seed.sql                 # Initial seed data
├── lib/                          # Utility functions
│   ├── auth.ts                  # Authentication utilities
│   ├── db.ts                    # Database connection
│   └── utils.ts                 # Common utilities
├── public/                       # Static assets
├── types/                        # TypeScript type definitions
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── components.json              # Shadcn component config
└── package.json                 # Dependencies & scripts
```

## Key API Endpoints

### Residents

- `GET /api/residents` - List all residents
- `POST /api/residents` - Create a new resident
- `GET /api/admissions` - List admission requests
- `POST /api/admissions` - Submit new admission

### Staff

- `GET /api/staff` - List all staff members
- `POST /api/staff` - Add new staff member

### Meals

- `GET /api/meals` - List meals
- `POST /api/meals` - Create meal plan
- `POST /api/cook/meals` - Update meal status
- `GET /api/cook/meals` - Get cook's meal assignments

### Medical

- `GET /api/medical` - Retrieve medical records
- `POST /api/medical` - Create medical record

### Appointments

- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Schedule appointment
- `GET/PUT /api/appointments/[id]` - Update appointment status

### Finance

- `GET /api/finance` - Get financial summary
- `GET /api/donations` - List donations
- `POST /api/donations` - Record donation

### Notices

- `GET /api/notices` - Retrieve notices
- `POST /api/notices` - Post new notice

## Authentication

The system uses **NextAuth v4** for authentication with the following features:

- Session-based authentication
- Role-based access control (RBAC)
- Secure password hashing with bcryptjs
- JWT token support
- Automatic session management

### Login Credentials

Refer to `database/seed.sql` for default test accounts created during initialization.

## Database Schema Overview

### Key Tables

- **residents** - Core resident information
- **staff** - Staff members and their roles
- **users** - User accounts and credentials
- **rooms** - Facility room management
- **medical_records** - Patient medical histories
- **meals** - Meal schedules and plans
- **appointments** - Appointment bookings
- **donations** - Financial contributions
- **notices** - System announcements
- **finance** - Finance tracking

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t oldage-caregiver-system .
docker run -p 3000:3000 oldage-caregiver-system
```

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running: `mysql -u root -p`
- Check environment variables in `.env.local`
- Ensure database exists: `SHOW DATABASES;`

### Build Errors

- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`

### Authentication Issues

- Ensure `NEXTAUTH_SECRET` is set
- Check session cookies in browser DevTools
- Verify user exists in database

## Performance Optimization

- **Turbopack**: Enabled for fast development builds
- **Next.js Image Optimization**: Automatic image optimization for hero and component images
- **Code Splitting**: Automatic by Next.js
- **CSS-in-JS**: Tailwind CSS with JIT compilation

## Security Considerations

- All passwords hashed with bcryptjs
- CSRF protection via NextAuth
- SQL injection prevention through parameterized queries
- Environment variables for sensitive data
- Secure session management
- Role-based access control on all routes

## Support

For issues, questions, or suggestions, please contact the development team or open an issue in the project repository.

## Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Radix UI](https://radix-ui.com) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [NextAuth](https://next-auth.js.org) - Authentication library
