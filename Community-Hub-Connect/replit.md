# Community Resource Hub

## Overview

Community Resource Hub is a web application designed to connect residents with local community resources, non-profits, support services, and programs. The platform serves as a central directory where users can browse, search, and filter community resources, as well as submit new resources for inclusion. The application emphasizes accessibility, trust-building, and clear information architecture following Material Design principles with a community-focused approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Build Tool**: Vite with React plugin

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (Home, Resources, About, Submit, Not Found)
- Reusable components in `client/src/components/`
- UI primitives in `client/src/components/ui/` (shadcn/ui components)
- Custom hooks in `client/src/hooks/`
- Utility functions and query client configuration in `client/src/lib/`

### Backend Architecture

- **Runtime**: Node.js with TypeScript (tsx for development)
- **Framework**: Express.js
- **API Structure**: RESTful endpoints under `/api/` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod for type-safe schema generation

Current API endpoints:
- `GET /api/resources` - Fetch all resources
- `GET /api/resources/featured` - Fetch featured resources
- `GET /api/resources/:id` - Fetch single resource by ID
- `POST /api/submissions` - Submit new resource for review

### Data Storage

- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` - Contains table definitions and TypeScript types
- **Migrations**: Drizzle Kit manages migrations in `./migrations` directory
- **Current Storage**: In-memory storage implementation with sample data (production should use database)

Key data models:
- `users` - User authentication (id, username, password)
- `Resource` - Community resource listings (defined as TypeScript interface)
- `ResourceSubmission` - User-submitted resources pending review

### Shared Code

The `shared/` directory contains code shared between frontend and backend:
- Schema definitions with Drizzle ORM
- Type definitions (Resource, ResourceCategory, ServiceType)
- Validation schemas using Zod
- Constants (RESOURCE_CATEGORIES, SERVICE_TYPES)

### Build System

- **Development**: Vite dev server with HMR for frontend, tsx for backend
- **Production Build**: Custom build script using esbuild for server bundling and Vite for client
- **Output**: Server bundle in `dist/index.cjs`, client assets in `dist/public/`

### Design System

The application implements a comprehensive design system defined in `design_guidelines.md`:
- Soft, calming pastel color palette with CSS variables
- Inter/Poppins typography
- Consistent spacing using Tailwind units
- Light and dark theme support
- Accessible-first approach with high contrast and clear hierarchy

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database query builder and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Libraries
- **Radix UI**: Headless UI primitives (accordion, dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **cmdk**: Command palette component
- **Vaul**: Drawer component
- **react-day-picker**: Calendar/date picker

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod resolver for React Hook Form

### Data Fetching
- **TanStack React Query**: Server state management and caching

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **tailwind-merge/clsx**: Class name utilities

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for Node.js
- **Drizzle Kit**: Database migration tooling

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner