/**
 * Constants for the application
 */

/**
 * API Configuration
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        PROFILE: '/api/auth/profile',
        USERS: '/api/auth/users',
    },

    // Files
    FILES: {
        UPLOAD: '/api/files/upload',
        UPLOAD_BULK: '/api/files/upload/bulk',
        LIST: '/api/files',
        GET: (id: string) => `/api/files/${id}`,
        DOWNLOAD: (id: string) => `/api/files/${id}/download`,
        DELETE: (id: string) => `/api/files/${id}`,
    },

    // Share
    SHARE: {
        WITH_USERS: '/api/share/users',
        GENERATE_LINK: '/api/share/link',
        SHARED_WITH_ME: '/api/share/shared-with-me',
        FILE_DETAILS: (fileId: string) => `/api/share/file/${fileId}`,
        ACCESS_LINK: (shareLink: string) => `/api/share/access/${shareLink}`,
        REVOKE: '/api/share/revoke',
        DELETE: (fileId: string) => `/api/share/file/${fileId}`,
    },

    // Audit (Bonus Feature)
    AUDIT: {
        MY_ACTIVITY: '/api/audit/my-activity',
        FILE_ACTIVITY: (fileId: string) => `/api/audit/file/${fileId}`,
        STATS: '/api/audit/stats',
    },

    // Health
    HEALTH: '/health',
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'safeshare_auth_token',
    USER: 'safeshare_user',
    THEME: 'safeshare_theme',
} as const;

/**
 * File Upload Configuration
 */
export const FILE_CONFIG = {
    MAX_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_TYPES: [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    ALLOWED_EXTENSIONS: ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.csv', '.xlsx', '.xls', '.doc', '.docx'],
} as const;

/**
 * Link Expiry Options (Bonus Feature)
 */
export const EXPIRY_OPTIONS = [
    { label: 'Never expires', value: '' },
    { label: '1 hour', value: '1' },
    { label: '24 hours', value: '24' },
    { label: '7 days', value: '168' },
    { label: '30 days', value: '720' },
] as const;

/**
 * Activity Action Labels
 */
export const ACTIVITY_LABELS = {
    FILE_UPLOAD: 'uploaded',
    FILE_DOWNLOAD: 'downloaded',
    FILE_DELETE: 'deleted',
    SHARE_CREATE: 'shared',
    SHARE_ACCESS: 'accessed',
    SHARE_REVOKE: 'revoked access to',
} as const;

/**
 * Routes
 */
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    FILES: '/files',
    FILE_DETAILS: (id: string) => `/files/${id}`,
    SHARED: '/shared',
    ACTIVITY: '/activity',
    PROFILE: '/profile',
    SETTINGS: '/settings',
} as const;

/**
 * Query Keys for React Query
 */
export const QUERY_KEYS = {
    USER: 'user',
    FILES: 'files',
    FILE: 'file',
    SHARED_FILES: 'shared-files',
    USERS: 'users',
    ACTIVITY: 'activity',
    ACTIVITY_STATS: 'activity-stats',
    FILE_ACTIVITY: 'file-activity',
} as const;
