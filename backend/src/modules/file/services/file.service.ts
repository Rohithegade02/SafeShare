import { File, IFile } from '../models/file.model';
import { AppError } from '../../../common/middleware/error.middleware';
import fs from 'fs';
import zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

export class FileService {
    async uploadFile(
        file: Express.Multer.File,
        userId: string,
        compress: boolean = false
    ): Promise<IFile> {
        let filePath = file.path;
        let isCompressed = false;

        // Compress file if requested (bonus feature)
        if (compress) {
            filePath = await this.compressFile(file.path);
            isCompressed = true;
        }

        const fileDoc = await File.create({
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: filePath,
            owner: userId,
            isCompressed,
        });

        return fileDoc;
    }

    async uploadMultipleFiles(
        files: Express.Multer.File[],
        userId: string,
        compress: boolean = false
    ): Promise<IFile[]> {
        const uploadedFiles = await Promise.all(
            files.map((file) => this.uploadFile(file, userId, compress))
        );
        return uploadedFiles;
    }

    async getUserFiles(userId: string): Promise<IFile[]> {
        const files = await File.find({ owner: userId }).sort({ createdAt: -1 });
        return files;
    }

    async getFileById(fileId: string, userId: string): Promise<IFile> {
        const file = await File.findById(fileId);

        if (!file) {
            throw new AppError('File not found', 404);
        }

        // Check if user has access (will be enhanced by share service)
        if (file.owner.toString() !== userId) {
            throw new AppError('Unauthorized access to file', 403);
        }

        return file;
    }

    async deleteFile(fileId: string, userId: string): Promise<void> {
        const file = await File.findById(fileId);

        if (!file) {
            throw new AppError('File not found', 404);
        }

        if (file.owner.toString() !== userId) {
            throw new AppError('Unauthorized to delete this file', 403);
        }

        // Delete physical file
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        await File.findByIdAndDelete(fileId);
    }

    async getFileStream(fileId: string, userId: string): Promise<{ stream: fs.ReadStream; file: IFile }> {
        const file = await this.getFileById(fileId, userId);

        if (!fs.existsSync(file.path)) {
            throw new AppError('File not found on disk', 404);
        }

        const stream = fs.createReadStream(file.path);

        return { stream, file };
    }

    private async compressFile(filePath: string): Promise<string> {
        const fileBuffer = fs.readFileSync(filePath);
        const compressed = await gzip(fileBuffer);

        const compressedPath = filePath + '.gz';
        fs.writeFileSync(compressedPath, compressed);

        // Delete original file
        fs.unlinkSync(filePath);

        return compressedPath;
    }

    async decompressFile(filePath: string): Promise<Buffer> {
        const compressedBuffer = fs.readFileSync(filePath);
        const decompressed = await gunzip(compressedBuffer);
        return decompressed;
    }
}
