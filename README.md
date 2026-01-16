# Liquid-Engine (FluxCore)

A next-generation Just-in-Time (JIT) UI generation platform for enterprise resource planning. This is a full-stack application that combines a modern React frontend with an Express.js backend, designed to create dynamic, on-demand interfaces for enterprise data.

## Project Vision

FluxCore represents "The death of the dashboard" - software that builds itself when needed. Instead of navigating static dashboards, users summon interfaces via natural language commands. The platform aims to compete with traditional ERP systems like SAP/Oracle with a 5-minute setup versus 6-18 months.

## Tech Stack

### Frontend

- **React 19.2.0** - UI framework
- **TypeScript 5.6.3** - Type safety
- **Vite 7.1.9** - Build tool & dev server
- **Wouter 3.3.5** - Lightweight routing
- **Framer Motion 12.23.24** - Animations
- **TanStack Query 5.60.5** - Data fetching
- **Recharts 2.15.4** - Data visualization
- **Tailwind CSS 4.1.14** - Utility-first styling
- **shadcn/ui** - Component library (50+ components)
- **Radix UI** - Headless UI components

### Backend

- **Express 4.21.2** - Web framework
- **Node.js 20+** - Runtime
- **TypeScript** - Type-safe server code

### Database & ORM

- **PostgreSQL** - Primary database
- **Drizzle ORM 0.39.3** - Database toolkit
- **Drizzle Kit 0.31.4** - Migrations

### Authentication

- **Passport 0.7.0** - Auth framework
- **passport-local 1.0.0** - Local strategy
- **express-session 1.18.1** - Session management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/) or use a cloud service:
  - [Supabase](https://supabase.com/)
  - [Railway](https://railway.app/)
  - [Neon](https://neon.tech/)
- **npm** (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Liquid-Engine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Environment Setup

1. **Copy the example environment file**

   ```bash
   cp .env.example .env
   ```

2. **Configure your environment variables**

   Edit the `.env` file with your settings:

   ```env
   # Node environment (development, production)
   NODE_ENV=development

   # Server port (default: 5000)
   PORT=5000

   # PostgreSQL Database Connection String
   # Format: postgresql://user:password@host:port/database
   # For local development:
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/liquidengine

   # For production (e.g., Supabase):
   # DATABASE_URL=postgresql://user:password@host.supabase.co:5432/postgres

   # Session Secret (for express-session)
   # IMPORTANT: Generate a random string for production!
   SESSION_SECRET=your-secret-key-change-this-in-production
   ```

## Database Setup

### Option 1: Local PostgreSQL

1. **Install PostgreSQL** on your machine
2. **Create a database:**

   ```bash
   # Using psql
   psql -U postgres
   CREATE DATABASE liquidengine;
   ```

3. **Update your `.env`** with the connection string

4. **Push the database schema:**
   ```bash
   npm run db:push
   ```

### Option 2: Cloud Database (Supabase/Railway/Neon)

1. **Create a new project** on your preferred platform
2. **Get your connection string** from the dashboard
3. **Update your `.env`** with the provided connection string
4. **Push the database schema:**
   ```bash
   npm run db:push
   ```

## Running the Project

### Development Mode

Start both the frontend and backend servers:

```bash
npm run dev
```

The application will be available at **http://localhost:5000**

### Frontend Only

If you only want to work on the frontend:

```bash
npm run dev:client
```

### Production Build

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## Available Scripts

| Command              | Description                                   |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start development server (frontend + backend) |
| `npm run dev:client` | Start frontend dev server only                |
| `npm run build`      | Build for production                          |
| `npm start`          | Start production server                       |
| `npm run check`      | Run TypeScript type checking                  |
| `npm run db:push`    | Push database schema                          |

## Project Structure

```
Liquid-Engine/
├── client/                    # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   └── flux-views.tsx # Dynamic view generators
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── pages/            # Page components
│   │   ├── App.tsx           # Router setup
│   │   └── main.tsx          # React entry point
│   └── index.html
├── server/                    # Backend Express server
│   ├── index.ts              # Main server entry
│   ├── routes.ts             # API routes
│   ├── static.ts             # Static file serving
│   ├── storage.ts            # In-memory storage layer
│   └── vite.ts               # Vite dev middleware
├── shared/                    # Shared code
│   └── schema.ts             # Database schema (Drizzle ORM)
├── script/
│   └── build.ts              # Build script
├── .env                      # Environment variables (create this)
├── .env.example              # Environment template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── drizzle.config.ts         # Database configuration
└── components.json           # shadcn/ui configuration
```

## Current Database Schema

```typescript
users {
  id: varchar (UUID, primary key, auto-generated)
  username: text (unique, not null)
  password: text (not null)
}
```

## Troubleshooting

### Port 5000 already in use

If you get an error that port 5000 is already in use:

1. **Find the process using the port:**

   ```bash
   # Windows
   netstat -ano | findstr :5000

   # Mac/Linux
   lsof -i :5000
   ```

2. **Kill the process or change the port** in your `.env` file:
   ```env
   PORT=3000
   ```

### Database connection errors

1. **Verify PostgreSQL is running:**

   ```bash
   # Windows
   # Check Services for "postgresql-x64-[version]"

   # Mac/Linux
   brew services list  # Mac
   sudo systemctl status postgresql  # Linux
   ```

2. **Test your connection string:**

   ```bash
   psql "postgresql://user:password@host:port/database"
   ```

3. **Ensure the database exists** before running `db:push`

### Windows: "NODE_ENV is not recognized"

This project uses `cross-env` to handle environment variables across platforms. If you still encounter issues:

1. **Reinstall dependencies:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Use PowerShell instead of CMD**

### Type errors after installing

Run the type checker to identify issues:

```bash
npm run check
```

### Frontend not updating

1. **Clear the Vite cache:**

   ```bash
   rm -rf node_modules/.vite
   ```

2. **Restart the dev server**

## Development Notes

- The project uses **Vite** for hot module replacement during development
- **Tailwind CSS v4** is used with the new Vite plugin
- All API routes are prefixed with `/api`
- Static files are served from the `dist` folder in production
- The development server proxies API requests to the Express backend

## Security Notes

- **NEVER** commit your `.env` file to version control
- **ALWAYS** use a strong `SESSION_SECRET` in production
- Use environment variables for sensitive configuration
- Keep dependencies updated: `npm audit fix`

## License

MIT

## Support

For issues and questions, please open an issue on the repository.
