import {
    Upload,
    Download,
    Trash2,
    Share2,
    Eye,
    UserMinus,
} from 'lucide-react';

export type ActivityAction =
    | 'FILE_UPLOAD'
    | 'FILE_DOWNLOAD'
    | 'FILE_DELETE'
    | 'SHARE_CREATE'
    | 'SHARE_ACCESS'
    | 'SHARE_REVOKE';

/**
 * Get icon component for activity action
 */
export const getActionIcon = (action: ActivityAction) => {
    const iconMap = {
        FILE_UPLOAD: Upload,
        FILE_DOWNLOAD: Download,
        FILE_DELETE: Trash2,
        SHARE_CREATE: Share2,
        SHARE_ACCESS: Eye,
        SHARE_REVOKE: UserMinus,
    };

    const Icon = iconMap[action];
    return Icon ?? null;
};

/**
 * Get color classes for activity action badge
 */
export const getActionColor = (action: ActivityAction): string => {
    const colorMap: Record<ActivityAction, string> = {
        FILE_UPLOAD: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        FILE_DOWNLOAD: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        FILE_DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        SHARE_CREATE: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        SHARE_ACCESS: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
        SHARE_REVOKE: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };

    return colorMap[action] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
};

/**
 * Get human-readable text for activity action
 */
export const getActionText = (action: ActivityAction): string => {
    return action.replace(/_/g, ' ').toLowerCase();
};

/**
 * Get file type color classes
 */
export const getFileTypeColor = (mimeType: string): string => {
    if (mimeType.includes('pdf')) {
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
    if (mimeType.includes('image')) {
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
    if (mimeType.includes('csv') || mimeType.includes('excel') || mimeType.includes('spreadsheet')) {
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
    if (mimeType.includes('word') || mimeType.includes('document')) {
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
};
