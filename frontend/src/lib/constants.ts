
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_TIMEOUT = 30000; // 30 seconds

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        PROFILE: '/api/auth/profile',
        USERS: '/api/auth/users',
    },
    FILES: {
        UPLOAD: '/api/files/upload',
        UPLOAD_BULK: '/api/files/upload/bulk',
        LIST: '/api/files',
        GET: (id: string) => `/api/files/${id}`,
        DOWNLOAD: (id: string) => `/api/files/${id}/download`,
        DELETE: (id: string) => `/api/files/${id}`,
    },
    SHARE: {
        WITH_USERS: '/api/share/users',
        GENERATE_LINK: '/api/share/link',
        SHARED_WITH_ME: '/api/share/shared-with-me',
        FILE_DETAILS: (fileId: string) => `/api/share/file/${fileId}`,
        ACCESS_LINK: (shareLink: string) => `/api/share/access/${shareLink}`,
        REVOKE: '/api/share/revoke',
        DELETE: (fileId: string) => `/api/share/file/${fileId}`,
    },
    AUDIT: {
        MY_ACTIVITY: '/api/audit/my-activity',
        FILE_ACTIVITY: (fileId: string) => `/api/audit/file/${fileId}`,
        STATS: '/api/audit/stats',
    },
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
    { label: 'Never expires', value: 'never' },
    { label: '1 hour', value: '1' },
    { label: '24 hours', value: '24' },
    { label: '7 days', value: '168' },
    { label: '30 days', value: '720' },
] as const;
