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
        const log = await AuditLog.create({
            user: userId,
            action,
            file: fileId,
            targetUser: targetUserId,
            metadata,
            ipAddress,
            userAgent,
        });

        return log;
    }

    async getUserActivityLog(userId: string, limit: number = 50): Promise<IAuditLog[]> {
        const logs = await AuditLog.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('user', 'username email')
            .populate('file', 'filename originalName')
            .populate('targetUser', 'username email');

        return logs;
    }

    async getFileActivityLog(fileId: string, limit: number = 50): Promise<IAuditLog[]> {
        const logs = await AuditLog.find({ file: fileId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('user', 'username email')
            .populate('targetUser', 'username email');

        return logs;
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
