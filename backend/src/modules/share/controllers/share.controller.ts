import { Response } from 'express';
import { ShareProvider } from '../providers/share.provider';
import { asyncHandler } from '../../../common/middleware/error.middleware';
import { AuthRequest } from '../../../common/interfaces/request.interface';

export class ShareController {
    private shareService = ShareProvider.getShareService();

    shareWithUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { fileId, userIds, expiresIn } = req.body;

        const share = await this.shareService.shareWithUsers(
            fileId,
            req.user!.id,
            userIds,
            expiresIn
        );

        res.status(200).json({
            success: true,
            data: share,
        });
    });

    generateShareLink = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { fileId, expiresIn } = req.body;

        const share = await this.shareService.generateShareLink(
            fileId,
            req.user!.id,
            expiresIn
        );

        res.status(200).json({
            success: true,
            data: {
                shareLink: share.shareLink,
                expiresAt: share.expiresAt,
            },
        });
    });

    getSharedFiles = asyncHandler(async (req: AuthRequest, res: Response) => {
        const shares = await this.shareService.getSharedFiles(req.user!.id);

        res.status(200).json({
            success: true,
            data: shares,
        });
    });

    getFileShares = asyncHandler(async (req: AuthRequest, res: Response) => {
        const share = await this.shareService.getFileShares(
            req.params.fileId,
            req.user!.id
        );

        res.status(200).json({
            success: true,
            data: share,
        });
    });

    accessByLink = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { shareLink } = req.params;

        const share = await this.shareService.accessFileByLink(shareLink, req.user!.id);

        res.status(200).json({
            success: true,
            data: share,
        });
    });

    revokeAccess = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { fileId, userIds } = req.body;

        await this.shareService.revokeAccess(fileId, req.user!.id, userIds);

        res.status(200).json({
            success: true,
            message: 'Access revoked successfully',
        });
    });

    deleteShare = asyncHandler(async (req: AuthRequest, res: Response) => {
        await this.shareService.deleteShare(req.params.fileId, req.user!.id);

        res.status(200).json({
            success: true,
            message: 'Share deleted successfully',
        });
    });
}
