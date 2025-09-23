# Overview

This is a modern full-stack furniture e-commerce application called "SM Furnishings" built with React and Express. The application showcases affordable luxury furniture with a sophisticated design system featuring warm terracotta and cream color schemes. It implements a complete e-commerce experience with product catalogs, collections, user interactions, and payment processing.

**Last Updated**: September 23, 2025 - Successfully imported and configured for Replit environment

# Recent Changes

- **September 23, 2025**: Project imported from GitHub and configured for Replit
  - Set up development workflow on port 5000 with webview output
  - Configured Vite server with `allowedHosts: true` for Replit proxy compatibility
  - Verified all dependencies installed correctly
  - Set up deployment configuration for autoscale deployment target
  - Application running successfully with external API integration

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with multiple pages (home, shop, product, cart, etc.)
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color schemes (terracotta/cream theme)
- **State Management**: 
  - TanStack Query (React Query) for server state management
  - Context API for cart and wishlist state
  - Local storage for persistent cart and wishlist data

## Backend Architecture
- **Framework**: Express.js with TypeScript (minimal backend)
- **Primary Function**: Payment processing via Razorpay integration
- **API Integration**: Uses external API at `https://sm-furnishing-backend.onrender.com` for:
  - Product catalog and data
  - User authentication
  - Cart management (when authenticated)
  - Form submissions (bulk orders, newsletter)
- **Local Features**: 
  - Razorpay payment order creation and verification
  - Request logging middleware
  - Vite development server integration

## Data Sources
- **Products**: External API providing comprehensive product catalog
- **Cart**: Hybrid approach - localStorage for guests, API for authenticated users
- **Wishlist**: localStorage-based with context state management
- **Forms**: External API for bulk order submissions and newsletter signups

## Payment Integration
- **Provider**: Razorpay (Indian payment gateway)
- **Features**: Order creation, payment verification, secure signature validation
- **Configuration**: Requires `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` environment variables

## Key Features
- **Product Catalog**: Full e-commerce product browsing with filtering and search
- **Shopping Cart**: Add/remove/modify items with quantity management
- **Wishlist**: Save favorite products for later
- **User Authentication**: Login/signup with JWT token management
- **Checkout Process**: Complete payment flow with Razorpay integration
- **Responsive Design**: Mobile-first approach optimized for all devices

# External Dependencies

## API Services
- **SM Furnishing Backend**: External API at `sm-furnishing-backend.onrender.com` provides product data, user auth, and cart management
- **Razorpay**: Payment gateway for secure transaction processing

## Frontend Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library providing consistent iconography
- **React Query**: Data fetching, caching, and synchronization
- **React Hook Form**: Form state management with Zod validation

## Development Tools
- **Vite**: Fast build tool and development server with HMR
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Vite plugins for Replit-specific development features

# Project Structure

```
├── client/src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Route-level page components
│   ├── lib/           # Utilities, API functions, contexts
│   └── data/          # Static data and configurations
├── server/            # Express backend (minimal)
├── attached_assets/   # Static assets and images
└── package.json       # Dependencies and scripts
```

# Running the Application

- **Development**: `npm run dev` - Starts both frontend and backend on port 5000
- **Production Build**: `npm run build` - Creates optimized production bundle
- **Production**: `npm run start` - Runs built application
- **Type Checking**: `npm run check` - Validates TypeScript types

The application is configured for Replit environment with proper host settings and proxy compatibility.