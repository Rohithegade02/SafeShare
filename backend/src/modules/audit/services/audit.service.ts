import { AuditLog, IAuditLog, AuditAction } from '../models/audit-log.model';

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
            { $match: { user: userId } },
            {
                $group: {
                    _id: '$action',
                    count: { $sum: 1 },
                },
            },
        ]);

        return stats;
    }
}
