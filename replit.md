# replit.md

## Overview

AutoClip.AI is a full-stack web application that generates short-form video clips from YouTube content for social media platforms. The application uses a modern React frontend with shadcn/ui components and an Express.js backend. Users can input YouTube URLs, select their content niche, and have the system automatically create optimized clips for platforms like TikTok and Instagram. The app includes authentication, video processing workflows, and social media publishing capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library configured for dark mode themes
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state and local React state for UI
- **Build Tool**: Vite with custom configuration for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: In-memory storage implementation with interface for future database integration
- **Development**: Hot reload with Vite middleware integration

### Data Architecture
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema**: User management system with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
- **Migrations**: Drizzle-kit for database schema management

### Authentication & Authorization
- **Method**: Session-based authentication with mock Google OAuth integration
- **Storage**: Local storage for user preferences and authentication tokens
- **Security**: Basic form validation with planned bearer token implementation

### Application Flow
- **Login Process**: Email/password or Google OAuth with niche selection for first-time users
- **Video Processing**: YouTube URL input → validation → processing simulation → dashboard display
- **Status Management**: Video states include processing, ready, published, and error with appropriate UI feedback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database client for PostgreSQL connections
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **next-themes**: Theme management for light/dark mode switching

### UI Components
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and development experience
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **esbuild**: Fast JavaScript bundler for production builds

### Planned Integrations
- **YouTube API**: For video metadata and content extraction
- **Social Media APIs**: TikTok, Instagram for automated publishing
- **Video Processing Service**: For actual clip generation and editing
- **File Storage**: Cloud storage for processed video assets