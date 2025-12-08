# SafeShare Frontend

A modern, secure file-sharing application built with React, TypeScript, and Vite.

## 🏗️ Architecture Overview

SafeShare frontend follows a **Container-Presentation Pattern** combined with **Atomic Design principles** for a scalable and maintainable codebase.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│                    (Route Configuration)                     │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    Pages     │    │   Services   │    │    Stores    │
│ (Containers) │◄───┤   (API)      │◄───┤  (Zustand)   │
└──────────────┘    └──────────────┘    └──────────────┘
        │
        ▼
┌──────────────┐
│ Presentation │
│  Components  │
└──────────────┘
        │
        ▼
┌──────────────┐
│  Molecules   │
└──────────────┘
        │
        ▼
┌──────────────┐
│    Atoms     │
└──────────────┘
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── atoms/           # Basic building blocks (Button, Input, etc.)
│   ├── molecules/       # Combinations of atoms (FileCard, FileList, etc.)
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   └── LoadingSpinner.tsx
│
├── pages/               # Page-level components (Container-Presentation)
│   ├── Dashboard/
│   │   ├── DashboardContainer.tsx      # Logic & State
│   │   ├── DashboardPresentation.tsx   # UI Only
│   │   ├── components/                 # Page-specific components
│   │   ├── types.ts                    # TypeScript types
│   │   └── index.ts                    # Exports
│   ├── Activity/
│   ├── Login/
│   ├── Register/
│   ├── Shared/
│   └── ShareLinkAccess/
│
├── hooks/               # Custom React hooks
│   ├── useAuth.ts      # Authentication logic
│   ├── useFiles.ts     # File management logic
│   ├── useShare.ts     # Sharing logic
│   ├── useAudit.ts     # Audit/activity logic
│   └── useFileView.ts  # File viewing logic
│
├── store/               # Zustand state management
│   ├── authStore.ts    # Authentication state
│   ├── fileStore.ts    # File management state
│   ├── shareStore.ts   # Sharing state
│   └── auditStore.ts   # Audit/activity state
│
├── services/            # API service layer
│   ├── api.ts          # Axios instance & interceptors
│   ├── auth.service.ts # Authentication API calls
│   ├── file.service.ts # File management API calls
│   ├── share.service.ts # Sharing API calls
│   └── audit.service.ts # Audit/activity API calls
│
├── types/               # TypeScript type definitions
│   ├── index.ts
│   ├── auth.types.ts
│   ├── file.types.ts
│   ├── share.types.ts
│   └── audit.types.ts
│
├── utils/               # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
│
├── route/               # Route constants
│   └── index.ts
│
├── lib/                 # Third-party library configs
│   └── utils.ts
│
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

##  Container-Presentation Pattern

SafeShare implements the **Container-Presentation Pattern** to separate business logic from UI rendering.

### Pattern Structure

```
Page/
├── PageContainer.tsx       # Container (Logic)
├── PagePresentation.tsx    # Presentation (UI)
├── components/             # Page-specific components
├── types.ts                # TypeScript interfaces
└── index.ts                # Exports
```

### Container Component (Logic Layer)

**Responsibilities:**
- Manage state and side effects
- Handle business logic
- Fetch data from APIs
- Process user interactions
- Connect to stores and hooks



### Presentation Component (UI Layer)

**Responsibilities:**
- Render UI based on props
- No business logic
- No API calls
- No state management (except local UI state)
- Fully testable and reusable



### Benefits

✅ **Separation of Concerns**: Logic and UI are decoupled  
✅ **Testability**: Easy to test logic and UI independently  
✅ **Reusability**: Presentation components can be reused  
✅ **Maintainability**: Changes to logic don't affect UI structure  
✅ **Type Safety**: Clear prop interfaces between layers  

## 🔄 Data Flow

```
User Action
    │
    ▼
Container Component
    │
    ├──► Custom Hook (useFiles, useAuth, etc.)
    │       │
    │       ├──► Zustand Store (fileStore, authStore, etc.)
    │       │       │
    │       │       └──► Service Layer (file.service.ts)
    │       │               │
    │       │               └──► API (Backend)
    │       │
    │       └──► Update State
    │
    └──► Presentation Component
            │
            └──► Render UI
```

### Example Flow: File Upload

1. **User clicks upload** → `DashboardPresentation`
2. **Event handler called** → `DashboardContainer.handleFileUpload()`
3. **Hook invoked** → `useFiles().uploadFile()`
4. **Store updated** → `fileStore.uploadFile()`
5. **API call made** → `fileService.uploadFile()`
6. **Response received** → Store updates state
7. **UI re-renders** → `DashboardPresentation` shows new file

## 🛠️ Tech Stack

### Core
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.5** - Build tool (Rolldown)

### Routing
- **React Router DOM 7.10.1** - Client-side routing

### State Management
- **Zustand 5.0.9** - Lightweight state management

### UI Components
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown, Select, Tabs, etc.
- **Lucide React** - Icon library
- **Tailwind CSS 4.1.17** - Utility-first CSS
- **class-variance-authority** - Component variants
- **clsx** - Conditional classes

### HTTP Client
- **Axios 1.13.2** - API requests with interceptors

### Theming
- **next-themes** - Dark/light mode support

### Notifications
- **Sonner** - Toast notifications

### Development
- **ESLint** - Code linting
- **Babel React Compiler** - React optimization

## 🎨 Component Hierarchy (Atomic Design)

### Atoms (Basic Building Blocks)
- `Button` - Clickable buttons
- `Input` - Text inputs
- `Label` - Form labels
- `Avatar` - User avatars
- `Badge` - Status badges
- `Checkbox` - Checkboxes
- `Switch` - Toggle switches

### Molecules (Combinations of Atoms)
- `FileCard` - Individual file display
- `FileList` - List of files
- `ActivityItem` - Activity log item
- `ShareDialog` - File sharing modal
- `UploadButton` - File upload trigger
- `SearchBar` - Search input with icon

### Pages (Containers + Presentations)
- **Dashboard** - Main file management
- **Activity** - Audit logs and statistics
- **Shared** - Files shared with user
- **ShareLinkAccess** - Access files via link
- **Login/Register** - Authentication

## 🔐 Authentication Flow

```
1. User logs in → authService.login()
2. Token received → authStore.setToken()
3. Token stored → localStorage
4. Axios interceptor → Adds token to requests
5. Protected routes → Check authStore.isAuthenticated
6. Token expires → Interceptor catches 401
7. Auto logout → authStore.logout()
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
# Start dev server
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📦 Key Features

- ✅ **File Upload/Download** - Secure file management
- ✅ **File Sharing** - Share with users or generate links
- ✅ **Activity Tracking** - Audit logs and statistics
- ✅ **Authentication** - JWT-based auth with auto-refresh
- ✅ **Dark Mode** - Theme switching support
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Loading States** - Skeleton loaders and spinners

## 🧪 Code Quality

### TypeScript
- Strict mode enabled
- Full type coverage
- Interface-driven development

### ESLint
- React hooks rules
- TypeScript ESLint
- Custom rules for consistency

### Best Practices
- Container-Presentation pattern
- Custom hooks for reusable logic
- Centralized state management
- Service layer for API calls
- Type-safe API responses

## 📝 Coding Conventions

### File Naming
- **Components**: PascalCase (`DashboardContainer.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Services**: camelCase with `.service` suffix (`auth.service.ts`)
- **Stores**: camelCase with `Store` suffix (`authStore.ts`)
- **Types**: camelCase with `.types` suffix (`auth.types.ts`)



## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `vercel.json` - Vercel deployment config (SPA routing)
- `.env.local` - Environment variables (not committed)



