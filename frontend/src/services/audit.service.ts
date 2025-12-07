import { api } from './api';

/**
 * Activity/Audit Log Types
 */
export interface Activity {
    _id: string;
    user: {
        _id: string;
        username: string;
        email: string;
    };
    action: 'FILE_UPLOAD' | 'FILE_DOWNLOAD' | 'FILE_DELETE' | 'SHARE_CREATE' | 'SHARE_ACCESS' | 'SHARE_REVOKE';
    file?: {
        _id: string;
        filename: string;
        originalName: string;
    };
    metadata?: {
        sharedWith?: string[];
        shareType?: 'user' | 'link';
        ipAddress?: string;
    };
    createdAt: string;
}

export interface ActivityStats {
    totalUploads: number;
    totalDownloads: number;
    totalShares: number;
    totalDeletes: number;
    recentActivity: Activity[];
}

/**
 * Get current user's activity log
 */
export const getMyActivity = async (): Promise<Activity[]> => {
    const response = await api.get<Activity[]>('/api/audit/my-activity');

    if (!response.success) {
        throw new Error(response.message || 'Failed to fetch activity');
    }

    if (!response.data) {
        throw new Error('No data received from server');
    }

    return response.data;
};

/**
 * Get activity for a specific file
 */
export const getFileActivity = async (fileId: string): Promise<Activity[]> => {
    const response = await api.get<Activity[]>(`/api/audit/file/${fileId}`);

    if (!response.success) {
        throw new Error(response.message || 'Failed to fetch file activity');
    }

    if (!response.data) {
        throw new Error('No data received from server');
    }

    return response.data;
};

/**
 * Get activity statistics
 */
export const getActivityStats = async (): Promise<ActivityStats> => {
    const response = await api.get<ActivityStats>('/api/audit/stats');

    if (!response.success) {
        throw new Error(response.message || 'Failed to fetch activity stats');
    }

    if (!response.data) {
        throw new Error('No data received from server');
    }

    return response.data;
};
