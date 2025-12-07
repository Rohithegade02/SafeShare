import type { User } from './auth.types';
import type { File } from './file.types';

/**
 * Audit Log Types (Bonus Feature)
 */
export type ActivityAction =
    | 'FILE_UPLOAD'
    | 'FILE_DOWNLOAD'
    | 'FILE_DELETE'
    | 'SHARE_CREATE'
    | 'SHARE_ACCESS'
    | 'SHARE_REVOKE';

export interface AuditLog {
    id: string;
    user: string | User;
    action: ActivityAction;
    file?: string | File;
    targetUser?: string | User;
    metadata?: Record<string, any>;
    createdAt: string;
}

export interface AuditLogsResponse {
    success: boolean;
    data: AuditLog[];
}

export interface ActivityStatsResponse {
    success: boolean;
    data: ActivityStats;
}

export interface AuditLogQueryParams {
    limit?: number;
    offset?: number;
    action?: ActivityAction;
    startDate?: string;
    endDate?: string;
}


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