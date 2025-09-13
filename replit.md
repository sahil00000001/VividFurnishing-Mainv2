# Overview

This is a modern full-stack furniture e-commerce application called "SM Furnishings" built with React, Express, and PostgreSQL. The application showcases affordable luxury furniture with a sophisticated design system featuring warm terracotta and cream color schemes. It implements a complete e-commerce experience with product catalogs, collections, and user interactions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with a simple Switch/Route pattern
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

## Design System
- **Typography**: Multiple font families including Playfair Display (serif), Inter (sans-serif), and Dancing Script (script)
- **Color Palette**: Warm earth tones with terracotta primary colors and cream backgrounds
- **Component Library**: Complete set of reusable UI components following consistent design patterns
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint handling

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Pattern**: RESTful API with /api prefix for all endpoints
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Tools**: Hot reloading with Vite integration and custom logging

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL connection
- **Storage Interface**: Abstracted storage layer supporting both memory storage (development) and PostgreSQL (production)

## Authentication & Session Management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Basic user schema with username/password authentication
- **Type Safety**: Zod schemas for request validation and TypeScript interfaces

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect support

## UI/UX Libraries
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library providing consistent iconography
- **Embla Carousel**: Carousel/slider functionality for product displays

## Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

## Third-party Integrations
- **React Query**: Data fetching and caching layer for API interactions
- **React Hook Form**: Form state management and validation
- **Date-fns**: Date manipulation and formatting utilities
- **Wouter**: Lightweight routing solution for React applications

The application follows modern full-stack development practices with strong separation of concerns, type safety throughout, and a focus on user experience and performance.