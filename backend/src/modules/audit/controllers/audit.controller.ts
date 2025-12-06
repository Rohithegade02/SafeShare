import { Response } from 'express';
import { AuditProvider } from '../providers/audit.provider';
import { asyncHandler } from '../../../common/middleware/error.middleware';
import { AuthRequest } from '../../../common/interfaces/request.interface';

export class AuditController {
    private auditService = AuditProvider.getAuditService();

    getUserActivityLog = asyncHandler(async (req: AuthRequest, res: Response) => {
        const limit = parseInt(req.query.limit as string) || 50;
        const logs = await this.auditService.getUserActivityLog(req.user!.id, limit);

        res.status(200).json({
            success: true,
            data: logs,
        });
    });

    getFileActivityLog = asyncHandler(async (req: AuthRequest, res: Response) => {
        const limit = parseInt(req.query.limit as string) || 50;
        const logs = await this.auditService.getFileActivityLog(req.params.fileId, limit);

        res.status(200).json({
            success: true,
            data: logs,
        });
    });

    getActivityStats = asyncHandler(async (req: AuthRequest, res: Response) => {
        const stats = await this.auditService.getActivityStats(req.user!.id);

        res.status(200).json({
            success: true,
            data: stats,
        });
    });
}
