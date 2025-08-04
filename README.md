# StorySpace

A modern blog platform built with React and Node.js for sharing thoughts and ideas. StorySpace provides a clean, user-friendly interface for creating posts, engaging with content through comments, and building a community around shared stories.

## Features

- User authentication with JWT tokens
- Create and view blog posts
- Comment system for post engagement
- Responsive Material-UI design
- Real-time data fetching with React Query
- Type-safe development with TypeScript

## Tech Stack

### Frontend

- React 19 with TypeScript
- TanStack Router for navigation
- TanStack Query for data fetching
- Material-UI for components
- Vite for build tooling

### Backend

- Node.js with Express
- TypeScript for type safety
- SQLite database with SQLite3
- JWT authentication
- Pino for structured logging

### Docs

- see [./docs/]

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/gazzaar/storyscape
cd storyscape
```

2. Install backend dependencies

```bash
cd server
npm install
```

3. Install frontend dependencies

```bash
cd web
npm install
```

### Running the Application

1. Start the backend server

```bash
cd server
npm start
```

The server will run on http://localhost:3000

2. Start the frontend development server

```bash
cd web
npm run dev
```

The frontend will run on http://localhost:3001

## Project Structure

```
storyscape/
├── server/                 # Backend API
│   ├── handlers/          # Request handlers
│   ├── middleware/        # Express middleware
│   ├── datastore/         # Database layer
│   ├── types.ts           # TypeScript interfaces
│   └── server.ts          # Main server file
├── web/                   # Frontend application
│   ├── src/
│   │   ├── auth/          # Authentication context
│   │   ├── components/    # Reusable components
│   │   ├── routes/        # Page components
│   │   └── types.ts       # TypeScript types
│   └── package.json
└── docs/                  # Documentation
```

## API Endpoints

### Authentication

- `POST /signup` - Register a new user
- `POST /signin` - Authenticate user
- `POST /validatetoken` - Validate JWT token

### Posts

- `GET /posts` - List all posts (protected)
- `POST /posts` - Create a new post (protected)

### Comments

- `GET /comments/:postId` - List comments for a post
- `POST /comments/:postId` - Add a comment to a post (protected)

## Database Schema

The application uses SQLite with three main tables:

- **Users**: Store user account information
- **Posts**: Store blog posts with titles, content, and metadata
- **Comments**: Store comments linked to posts and users

## Development

### Backend Development

The server uses TypeScript with Express. Key features include:

- Middleware for authentication and error handling
- Structured logging with Pino
- Type-safe API handlers
- SQLite database with DAO pattern

### Frontend Development

The React application features:

- Modern React patterns with hooks
- TanStack Query for server state management
- Protected routes for authenticated users
- Material-UI components for consistent design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
