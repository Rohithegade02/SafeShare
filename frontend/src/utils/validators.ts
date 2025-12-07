/**
 * Validation utilities
 */

import { FILE_CONFIG } from '@/lib/constants';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): {
    valid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validate username
 */
export const isValidUsername = (username: string): boolean => {
    // Username must be 3-20 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};

/**
 * Validate file size
 */
export const isValidFileSize = (file: File): boolean => {
    return file.size <= FILE_CONFIG.MAX_SIZE;
};

/**
 * Validate file type
 */
export const isValidFileType = (file: File): boolean => {
    return FILE_CONFIG.ALLOWED_TYPES.includes(file.type as any);
};

/**
 * Validate file
 */
export const validateFile = (file: File): {
    valid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (!isValidFileSize(file)) {
        errors.push(`File size must be less than ${FILE_CONFIG.MAX_SIZE / 1024 / 1024}MB`);
    }

    if (!isValidFileType(file)) {
        errors.push('File type not allowed');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validate multiple files
 */
export const validateFiles = (files: File[]): {
    valid: boolean;
    errors: string[];
    invalidFiles: File[];
} => {
    const errors: string[] = [];
    const invalidFiles: File[] = [];

    files.forEach(file => {
        const validation = validateFile(file);
        if (!validation.valid) {
            invalidFiles.push(file);
            errors.push(`${file.name}: ${validation.errors.join(', ')}`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
        invalidFiles,
    };
};
