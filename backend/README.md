# SafeShare Backend API

A full-stack file sharing application backend built with **Express + TypeScript** following **NestJS-like microservice architecture** with **MongoDB**.

## 🏗️ Architecture

This project follows a **microservice architecture pattern** with clean separation of concerns:

```
backend/
├── src/
│   ├── config/                    # Configuration files
│   │   └── database.config.ts     # MongoDB connection
│   ├── common/                    # Shared utilities
│   │   ├── interfaces/
│   │   │   └── request.interface.ts
│   │   └── middleware/
│   │       └── error.middleware.ts
│   ├── modules/                   # Microservices
│   │   ├── auth/                  # Authentication Service
│   │   │   ├── models/
│   │   │   │   └── user.model.ts
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── providers/
│   │   │   │   └── auth.provider.ts
│   │   │   ├── controllers/
│   │   │   │   └── auth.controller.ts
│   │   │   ├── middleware/
│   │   │   │   └── auth.middleware.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.module.ts
│   │   ├── file/                  # File Management Service
│   │   │   ├── models/
│   │   │   │   └── file.model.ts
│   │   │   ├── services/
│   │   │   │   └── file.service.ts
│   │   │   ├── providers/
│   │   │   │   └── file.provider.ts
│   │   │   ├── controllers/
│   │   │   │   └── file.controller.ts
│   │   │   ├── config/
│   │   │   │   └── multer.config.ts
│   │   │   ├── file.routes.ts
│   │   │   └── file.module.ts
│   │   ├── share/                 # File Sharing Service
│   │   │   ├── models/
│   │   │   │   └── share.model.ts
│   │   │   ├── services/
│   │   │   │   └── share.service.ts
│   │   │   ├── providers/
│   │   │   │   └── share.provider.ts
│   │   │   ├── controllers/
│   │   │   │   └── share.controller.ts
│   │   │   ├── share.routes.ts
│   │   │   └── share.module.ts
│   │   └── audit/                 # Audit Logging Service (Bonus)
│   │       ├── models/
│   │       │   └── audit-log.model.ts
│   │       ├── services/
│   │       │   └── audit.service.ts
│   │       ├── providers/
│   │       │   └── audit.provider.ts
│   │       ├── controllers/
│   │       │   └── audit.controller.ts
│   │       ├── audit.routes.ts
│   │       └── audit.module.ts
│   └── index.ts                   # Application entry point
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🚀 Features

### Core Features
1. **File Upload**
   - Single and bulk file uploads
   - File type validation (PDF, images, CSV, documents)
   - File size limits
   - File compression (bonus feature)

2. **File Sharing**
   - **User-specific sharing**: Share with specific users
   - **Link-based sharing**: Generate shareable links (authenticated users only)
   - **Link expiry**: Set expiration time for shares (bonus feature)

3. **Security & Access Control**
   - JWT-based authentication
   - Strict authorization checks
   - File type and size validation
   - No public access to files

4. **Audit Logging** (Bonus Feature)
   - Track file uploads, downloads, and deletions
   - Track share creation and access
   - Activity statistics per user

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer
- **Password Hashing**: bcryptjs
- **File Compression**: zlib (Node.js built-in)

## 🛠️ Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/safeshare
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   MAX_FILE_SIZE=52428800
   UPLOAD_PATH=./uploads
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Auth Service (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/users` - Get all users (protected)

### File Service (`/api/files`)
- `POST /api/files/upload` - Upload single file (protected)
- `POST /api/files/upload/bulk` - Upload multiple files (protected)
- `GET /api/files` - Get user's files (protected)
- `GET /api/files/:id` - Get file details (protected)
- `GET /api/files/:id/download` - Download file (protected)
- `DELETE /api/files/:id` - Delete file (protected)

### Share Service (`/api/share`)
- `POST /api/share/users` - Share file with specific users (protected)
- `POST /api/share/link` - Generate shareable link (protected)
- `GET /api/share/shared-with-me` - Get files shared with user (protected)
- `GET /api/share/file/:fileId` - Get file share details (protected)
- `GET /api/share/access/:shareLink` - Access file by link (protected)
- `POST /api/share/revoke` - Revoke user access (protected)
- `DELETE /api/share/file/:fileId` - Delete share (protected)

### Audit Service (`/api/audit`)
- `GET /api/audit/my-activity` - Get user activity log (protected)
- `GET /api/audit/file/:fileId` - Get file activity log (protected)
- `GET /api/audit/stats` - Get activity statistics (protected)

## 🔒 Security Features

1. **Authentication**: JWT-based authentication with secure token generation
2. **Authorization**: Middleware to protect routes and verify ownership
3. **File Validation**: Type and size validation for uploads
4. **Access Control**: Strict checks for file access via shares and links
5. **Password Security**: bcrypt hashing with salt rounds
6. **CORS**: Configured for specific origins

## 🎯 Bonus Features Implemented

1.  **Link Expiry**: Set expiration time for shares
2.  **Audit Log**: Track all file and share activities
3.  **File Compression**: Store files in compressed format (gzip)

## 🧪 Testing

Use tools like **Postman** or **Thunder Client** to test the API endpoints.

### Example: Register User
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Example: Upload File
```bash
POST http://localhost:3000/api/files/upload
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data

file: <select file>
compress: true
```

## 📝 Notes

- The backend uses a **NestJS-like structure** with Express for better organization
- Each microservice has its own **module, controller, service, and provider**
- **Dependency injection** pattern is used via providers
- All routes are properly typed with TypeScript
- Error handling is centralized via middleware

## 🤝 Contributing

This is a demonstration project for a file-sharing application with microservice architecture.

## 📄 License

MIT
