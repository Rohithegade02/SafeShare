import { AuditLog, IAuditLog, AuditAction } from '../models/audit-log.model';
import mongoose from 'mongoose';

export class AuditService {
    async logActivity(
        userId: string,
        action: AuditAction,
        fileId?: string,
        targetUserId?: string,
        metadata?: any,
        ipAddress?: string,
        userAgent?: string
    ): Promise<IAuditLog> {
        // Build the log object conditionally to avoid passing undefined to optional properties
        // This is required when exactOptionalPropertyTypes is enabled in tsconfig
        const logData: any = {
            user: userId,
            action,
        };

        if (fileId) logData.file = fileId;
        if (targetUserId) logData.targetUser = targetUserId;
        if (metadata) logData.metadata = metadata;
        if (ipAddress) logData.ipAddress = ipAddress;
        if (userAgent) logData.userAgent = userAgent;

        const log = (await AuditLog.create(logData)) as unknown as IAuditLog;

        return log;
    }

    async getUserActivityLog(userId: string, limit: number = 50): Promise<IAuditLog[]> {
        const logs = await AuditLog.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('user', 'username email')
            .populate('file', 'filename originalName')
            .populate('targetUser', 'username email')
            .exec();

        return logs as IAuditLog[];
    }

    async getFileActivityLog(fileId: string, limit: number = 50): Promise<IAuditLog[]> {
        const logs = await AuditLog.find({ file: fileId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('user', 'username email')
            .populate('targetUser', 'username email')
            .exec();

        return logs as IAuditLog[];
    }

    async getActivityStats(userId: string): Promise<any> {
        const stats = await AuditLog.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: '$action',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Transform aggregation results into a more usable format
        const formattedStats = {
            totalUploads: 0,
            totalDownloads: 0,
            totalShares: 0,
            totalDeletes: 0,
        };

        stats.forEach((stat) => {
            switch (stat._id) {
                case AuditAction.FILE_UPLOAD:
                    formattedStats.totalUploads = stat.count;
                    break;
                case AuditAction.FILE_DOWNLOAD:
                    formattedStats.totalDownloads = stat.count;
                    break;
                case AuditAction.SHARE_CREATE:
                case AuditAction.SHARE_ACCESS:
                    formattedStats.totalShares += stat.count;
                    break;
                case AuditAction.FILE_DELETE:
                case AuditAction.SHARE_REVOKE:
                    formattedStats.totalDeletes += stat.count;
                    break;
            }
        });

        return formattedStats;
    }
}
