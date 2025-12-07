import { api } from './api';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
    ShareWithUsersRequest,
    GenerateShareLinkRequest,
    ShareResponse,
    ShareLinkResponse,
    SharedFilesResponse,
    RevokeAccessRequest,
} from '@/types/share.types';

/**
 * Share a file with specific users
 */
export const shareWithUsers = async (data: ShareWithUsersRequest): Promise<ShareResponse> => {
    const response = await api.post<ShareResponse>(
        API_ENDPOINTS.SHARE.WITH_USERS,
        data
    );

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to share file');
};

/**
 * Generate a shareable link for a file
 */
export const generateShareLink = async (data: GenerateShareLinkRequest): Promise<ShareLinkResponse> => {
    const response = await api.post<ShareLinkResponse>(
        API_ENDPOINTS.SHARE.GENERATE_LINK,
        data
    );

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to generate share link');
};

/**
 * Get all files shared with the current user
 */
export const getSharedFiles = async (): Promise<SharedFilesResponse> => {
    const response = await api.get<SharedFilesResponse>(
        API_ENDPOINTS.SHARE.SHARED_WITH_ME
    );

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to fetch shared files');
};

/**
 * Get all shares for a specific file (owner only)
 */
export const getFileShares = async (fileId: string): Promise<ShareResponse> => {
    const response = await api.get<ShareResponse>(
        API_ENDPOINTS.SHARE.FILE_DETAILS(fileId)
    );

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to fetch file shares');
};

/**
 * Access a file using a share link
 */
export const accessByLink = async (shareLink: string): Promise<ShareResponse> => {
    const response = await api.get<ShareResponse>(
        API_ENDPOINTS.SHARE.ACCESS_LINK(shareLink)
    );

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to access file');
};

/**
 * Revoke access from specific users
 */
export const revokeAccess = async (data: RevokeAccessRequest): Promise<{ success: boolean }> => {
    const response = await api.post<{ success: boolean }>(
        API_ENDPOINTS.SHARE.REVOKE,
        data
    );

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to revoke access');
};

/**
 * Delete all shares for a file (owner only)
 */
export const deleteAllShares = async (fileId: string): Promise<{ success: boolean }> => {
    const response = await api.delete<{ success: boolean }>(
        API_ENDPOINTS.SHARE.DELETE(fileId)
    );

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to delete shares');
};
