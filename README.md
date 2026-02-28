**Task Management System**
A full-stack role-based task management application built with Next.js (App Router) and Express.js.
The system implements secure JWT authentication, Role-Based Access Control (RBAC), and an
administrative dashboard for user management.
**Live Deployment**
Frontend:
https://task-management-system-jy7j.vercel.app/register
Backend API:
https://task-management-system-one-lake.vercel.app/
Note: Hosted on Vercel free tier. Initial API requests may be slow due to cold starts.
**Demo Credentials**
• Admin Account - Email: admin@test.com | Password: 123456
• User Account - Email: user@test.com | Password: 123456
**Technology Stack**
• Frontend: Next.js (App Router), React, Tailwind CSS, Axios
• Backend: Node.js, Express.js, JWT Authentication, RBAC, Swagger
• Database: Neon PostgreSQL, Prisma ORM
• Deployment: Vercel (Frontend & Backend), Neon (Database)
**Core Features**
• User registration with hashed passwords
• Secure login with JWT issuance
• Session validation endpoint (/api/v1/auth/me)
• Protected routes with Bearer authentication
• Admin-only dashboard access
• Task creation, update, deletion, and completion
• User-specific task isolation
• RESTful API design with versioning (/api/v1)
**Security Considerations**
• Passwords hashed before storage
• JWT secret stored in environment variables
• Server-side role validation
• Sensitive configuration excluded from version control
• Proper HTTP status handling and centralized error middleware
**Screenshots**
<img width="1919" height="1079" alt="Screenshot 2026-02-28 151408" src="https://github.com/user-attachments/assets/0c95200c-ca6e-41fe-8dc4-aafb1b7555d5" />
<img width="1919" height="1079" alt="Screenshot 2026-02-28 151338" src="https://github.com/user-attachments/assets/8bc690eb-94e5-432a-bdb0-b6c63394b47a" />
<img width="1918" height="1079" alt="Screenshot 2026-02-28 151347" src="https://github.com/user-attachments/assets/8cd0ba6d-ffd4-4cd9-b52f-0e56f14eb196" />
<img width="1919" height="1079" alt="Screenshot 2026-02-28 151400" src="https://github.com/user-attachments/assets/65bd5bb8-29b0-45b8-99c7-c2b2974864a2" />
**Author**
Yugank Adhikari
