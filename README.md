# Task Management System

A full-stack role-based task management application built using Next.js and Express.  
The system implements secure JWT authentication, role-based access control (RBAC), and an administrative dashboard for user management.

This project demonstrates backend API design, authentication security practices, database schema management, and responsive frontend integration.

---

## Live Demo

**Frontend**  
https://your-vercel-app.vercel.app  

**Backend API**  
https://your-render-backend.onrender.com  

---

## Demo Credentials

### Admin Account
- Email: admin@test.com  
- Password: 123456  

### User Account
- Email: user@test.com  
- Password: 123456  

---

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- JWT Authentication
- Role-Based Access Control (RBAC)
- Swagger API Documentation

### Database
- Neon (Serverless PostgreSQL)
- Prisma ORM

### Deployment
- Vercel (Frontend)
- Render (Backend)
- Neon (Database)

---

## Core Features

### Authentication and Authorization
- User registration with hashed passwords
- Secure login with JWT token issuance
- Protected routes requiring valid authentication
- `/auth/me` endpoint for session validation
- Role-based access enforcement (Admin / User)

### Task Management
- Create tasks
- Update tasks
- Delete tasks
- Mark tasks as complete / incomplete
- User-specific task isolation

### Administrative Dashboard
- Admin-only route protection
- View all registered users
- Role display and verification
- Backend-enforced authorization

### API Design
- RESTful endpoint structure
- API versioning (`/api/v1`)
- Proper HTTP status codes
- Centralized error handling
- Request validation
- Swagger documentation

---

## API Documentation

Swagger documentation is available at:
/api-docs


Includes:
- Authentication endpoints
- Task CRUD endpoints
- Admin user endpoints
- Request and response schemas

---

## Architecture Overview

### Authentication Flow

1. User submits login credentials.
2. Server validates credentials.
3. JWT is generated and returned.
4. Token is stored in `localStorage`.
5. Client sends token in the `Authorization: Bearer` header.
6. Backend verifies token before granting access.

### Role-Based Access Control (RBAC)

- Each user record includes a role field.
- Backend middleware validates role before allowing access.
- Admin routes are enforced server-side.
- Frontend conditionally renders admin interface based on verified role.

---

## Database Schema

### User
- id  
- name  
- email  
- password (hashed)  
- role  

### Task
- id  
- title  
- description  
- completed  
- userId (foreign key)  

Prisma manages schema migrations and database interaction.

---

## Project Structure
project-root/
│
├── frontend/
│ ├── app/
│ ├── components/
│ └── ...
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── utils/
│ ├── prisma/
│ └── server.js
│
└── README.md


---

## Local Setup

### Backend
-cd backend
-npm install
-Create a `.env` file:
 DATABASE_URL=your_neon_database_url
 JWT_SECRET=your_secret_key
 PORT=5000
-run:
 npm start

---

### Frontend
-cd frontend
-npm install
-Create a `.env.local` file:
 NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
-run:
 npm run dev

---

## Security Considerations

- Passwords are hashed before storage.
- JWT secret stored securely in environment variables.
- Role validation enforced server-side.
- Sensitive configuration excluded from version control.

---
##screenshots


## Author

Yugank Adhikari
