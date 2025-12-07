import { api } from './api';
import type { Activity, ActivityStats } from '@/types/audit.types';

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
