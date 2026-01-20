Smart Todo App

A full-stack task management application with AI-powered troubleshooting, real-time updates, and production-ready Docker deployment.


<img width="1904" height="883" alt="Screenshot 2026-01-20 220046" src="https://github.com/user-attachments/assets/45afdbbb-340a-465f-b2f6-ed04e9d56b3a" />



 Features
 
  AI Auto-Fix - Automatically analyzes problematic tasks using Google Gemini AI and suggests technical solutions
  
  Resilient Architecture - Mock fallback system ensures the app works even without API keys or internet connectivity
  
  One-Command Deploy - Fully containerized with Docker Compose for instant setup
  
  Secure API - Header-based authentication protects all endpoints
  
  Optimistic UI - Instant feedback with TanStack Query caching and state management
  
Architecture

fullstack-test/

├── client/          # React + Vite frontend

├── server/          # NestJS backend

└── docker-compose.yml

Tech Stack:

Backend: NestJS, Prisma ORM, PostgreSQL, Class-Validator
Frontend: React 18, TypeScript, TailwindCSS, TanStack Query, Axios
Infrastructure: Docker, Docker Compose

🚀 Quick Start
Prerequisites

Docker Desktop installed and running

Installation

Clone the repository

bashgit clone <your-repo-url>
cd fullstack-test

Start the application

bashdocker compose up --build
Wait for the logs showing:

✅ Nest application successfully started
✅ Local: http://localhost:5173/


Initialize the database (first run only)

bashdocker exec -it todo_server npx prisma migrate dev --name init

Access the app


Frontend: http://localhost:5173
Backend API: http://localhost:3000

Testing the Features
Test AI Troubleshooting

Create a new task (e.g., "Deploy to Production")
Change status to PROBLEM via dropdown
Enter a technical issue in the red description box:

   Database connection refused on port 5432

Click Update
A purple "AI Solution" box appears with suggested fixes

Test API Security
The backend validates the x-user-id header on all requests.

Frontend automatically includes this header
Direct browser access to http://localhost:3000/api/todos returns 401 Unauthorized

💻 Local Development (Without Docker)
Prerequisites

Node.js v18+
PostgreSQL running locally

Backend Setup
bashcd server
npm install

# Configure environment
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run start:dev
Frontend Setup
bashcd client
npm install
npm run dev

Design Decisions
Monorepo Structure
Unified repository for seamless orchestration and simplified Docker context management.
Prisma ORM
Chosen over TypeORM for superior type-safety and schema-first design that prevents runtime errors.
Resilient AI Integration
Implements graceful degradation with mock fallback - if Gemini AI is unavailable, the system switches to simulated responses automatically.
Docker Architecture

Uses node:22-alpine for minimal image size
Health checks ensure database readiness before API startup
Prevents connection failures through proper service orchestration
