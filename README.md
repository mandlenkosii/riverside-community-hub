# Riverside Community Hub

A full-stack membership, facility booking, programmes, notifications, and donations platform built for Riverside Community Hub, a fictional nonprofit community centre.

The platform replaces manual paper and WhatsApp-based processes with a centralised web application where community members can register, manage their profiles, view programmes and facilities, make bookings, receive booking notifications, and support donation campaigns.

---

## Project Overview

Riverside Community Hub provides:

- Youth programmes
- Community fitness activities
- Meeting and event rooms
- Equipment such as projectors and sound systems
- Food support programmes
- Community donation campaigns

The original manual process made it difficult to manage memberships, bookings, donations, and communication efficiently.

This project provides a single platform for these activities.

---

## Main Features

### Public Features

Visitors can:

- View the Riverside Community Hub welcome page
- Browse available facilities
- View community programmes
- View active donation campaigns
- See donation campaign progress
- Navigate between all major sections without manually entering URLs
- Register for an account
- Sign in to an existing account

### Member Features

Authenticated members can:

- Create an account
- Sign in and sign out
- View their member dashboard
- View and update their profile
- View membership information
- View available facilities
- Create facility and equipment booking requests
- View their existing bookings
- Cancel eligible bookings
- View booking statuses
- View notifications
- Mark notifications as read
- Make donations
- View donation campaign progress

### Staff Features

Staff members can:

- Access the staff dashboard
- View booking requests
- Approve booking requests
- Reject booking requests
- Manage booking workflow
- Generate booking notifications for members

### Security Features

The application uses:

- Supabase Authentication
- PostgreSQL Row Level Security (RLS)
- Database-level role checks
- Database-level booking conflict prevention
- Protected frontend routes
- Role-protected staff routes
- Profile privilege protection
- Booking status protection
- Environment variables for sensitive configuration
- No service-role key exposed to the frontend

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Supabase JavaScript Client

### Backend

- Node.js
- Express
- TypeScript
- Zod
- CORS
- dotenv
- Supabase JavaScript Client

### Database and Authentication

- Supabase
- PostgreSQL
- Supabase Auth
- PostgreSQL Row Level Security
- PostgreSQL triggers and functions

### Deployment

Planned production deployment:

- Frontend: Vercel
- Backend: Render
- Database/Auth: Supabase

---

## Project Structure

```text
riverside-community-hub/
│
├── backend/
│   ├── src/
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── README.md
│
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── HANDOVER.md
│
├── .gitignore
└── README.md
```
