import { Response } from 'express';
import { FileProvider } from '../providers/file.provider';
import { asyncHandler } from '../../../common/middleware/error.middleware';
import { AuthRequest } from '../../../common/interfaces/request.interface';

export class FileController {
    private fileService = FileProvider.getFileService();

    uploadSingle = asyncHandler(async (req: AuthRequest, res: Response) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const compress = req.body.compress === 'true';
        const file = await this.fileService.uploadFile(req.file, req.user!.id, compress);

        res.status(201).json({
            success: true,
            data: file,
        });
    });

    uploadMultiple = asyncHandler(async (req: AuthRequest, res: Response) => {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded',
            });
        }

        const compress = req.body.compress === 'true';
        const files = await this.fileService.uploadMultipleFiles(req.files, req.user!.id, compress);

        res.status(201).json({
            success: true,
            data: files,
        });
    });

    getUserFiles = asyncHandler(async (req: AuthRequest, res: Response) => {
        const files = await this.fileService.getUserFiles(req.user!.id);

        res.status(200).json({
            success: true,
            data: files,
        });
    });

    getFile = asyncHandler(async (req: AuthRequest, res: Response) => {
        const file = await this.fileService.getFileById(req.params.id, req.user!.id);

        res.status(200).json({
            success: true,
            data: file,
        });
    });

    downloadFile = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { buffer, file } = await this.fileService.getFileBuffer(req.params.id, req.user!.id);

        res.setHeader('Content-Type', file.mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
        res.setHeader('Content-Length', buffer.length);

        res.send(buffer);
    });

    deleteFile = asyncHandler(async (req: AuthRequest, res: Response) => {
        await this.fileService.deleteFile(req.params.id, req.user!.id);

        res.status(200).json({
            success: true,
            message: 'File deleted successfully',
        });
    });
}
