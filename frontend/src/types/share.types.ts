import type { File } from './file.types';
import type { User } from './auth.types';

/**
 * Share Types
 */
export interface Share {
    id: string;
    file: string | File;
    owner: string | User;
    shareType: 'user' | 'link';
    sharedWith?: string[] | User[];
    shareLink?: string;
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ShareWithUsersRequest {
    fileId: string;
    userIds: string[];
    expiresIn?: number; // in hours
}

export interface GenerateShareLinkRequest {
    fileId: string;
    expiresIn?: number; // in hours
}

export interface ShareResponse {
    success: boolean;
    data: Share;
}

export interface ShareLinkResponse {
    success: boolean;
    data: {
        shareLink: string;
        expiresAt?: string;
    };
}

export interface SharedFilesResponse {
    success: boolean;
    data: Share[];
}

export interface RevokeAccessRequest {
    fileId: string;
    userIds: string[];
}
