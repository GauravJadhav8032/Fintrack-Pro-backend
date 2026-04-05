# FinTrack Pro — Finance Backend System

## 1. Project Overview
FinTrack Pro is a role-based finance backend system for managing financial records, enforcing access control, and serving analytics-ready dashboard data.

Key capabilities:
- Role-based access control (Viewer, Analyst, Admin)
- Financial records management for income and expense
- Dashboard analytics for summary, categories, trends, and recent activity

## 2. Features
- User and role management
- Financial records CRUD with soft delete support
- Dashboard analytics (summary, trends, categories, recent)
- Role-based access control (RBAC)
- Input validation and centralized error handling
- Swagger API documentation (OpenAPI 3.0.3)

## 3. Tech Stack
- Node.js
- Express.js
- SQLite
- Prisma ORM
- JWT Authentication
- Zod Validation
- Swagger (OpenAPI 3.0)

## 4. Project Structure
```text
backend/
  src/
    controllers/
    services/
    routes/
    middleware/
    models/
    validators/
    config/
    utils/
    app.js
    server.js
  package.json
  prisma.config.ts
  .gitignore
```

## 5. Installation and Setup
1. Clone the repository:
```bash
git clone https://github.com/GauravJadhav8032/Fintrack-Pro-backend.git
cd Fintrack-Pro-backend/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
JWT_SECRET=your_strong_secret
DATABASE_URL="file:./dev.db"
```

4. Run Prisma migrations:
```bash
npm run prisma:migrate -- --name init
npm run prisma:generate
```

5. Start the server:
```bash
npm start
```

## 6. Environment Variables
Required variables:
- PORT=
- JWT_SECRET=
- DATABASE_URL=

Example:
```env
PORT=3000
JWT_SECRET=your_strong_secret
DATABASE_URL="file:./dev.db"
```

## 7. API Documentation
- Swagger UI: `(https://fintrack-pro-backend-h1l8.onrender.com)`

## 8. API Endpoints Overview
### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Records
- GET /api/records
- POST /api/records
- PATCH /api/records/:id
- DELETE /api/records/:id

### Dashboard
- GET /api/dashboard/summary
- GET /api/dashboard/categories
- GET /api/dashboard/trends
- GET /api/dashboard/recent

### Users
- GET /api/users
- POST /api/users
- PATCH /api/users/:id
- DELETE /api/users/:id

## 9. Role-Based Access Control
- Viewer: dashboard access only
- Analyst: read access to records and dashboard
- Admin: full access to users, records, and dashboard

## 10. Example API Response
Success:
```json
{
  "success": true,
  "data": {}
}
```

Error:
```json
{
  "success": false,
  "message": "Error message"
}
```

## 11. Deployment
- Deployment platform: Render
- Live API base URL: (https://fintrack-pro-backend-h1l8.onrender.com)

## 12. Future Enhancements
- Advanced pagination
- Search and filtering improvements
- Multi-user organization support
- GraphQL API layer
