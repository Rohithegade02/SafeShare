/**
 * Common API Response Types
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface ApiError {
    success: false;
    message: string;
    error?: string;
    statusCode?: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

/**
 * HTTP Methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Request Config
 */
export interface RequestConfig {
    method: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string | number | boolean>;
}

/**
 * Upload Progress
 */
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

/**
 * Filter and Sort Options
 */
export interface FilterOptions {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

/**
 * Toast Notification Types
 */
export interface ToastOptions {
    title?: string;
    description: string;
    variant?: 'default' | 'destructive' | 'success';
    duration?: number;
}
