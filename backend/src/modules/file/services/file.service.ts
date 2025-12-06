import { File, IFile } from '../models/file.model';
import { AppError } from '../../../common/middleware/error.middleware';
import { DatabaseConfig } from '../../../config/database.config';
import { Readable } from 'stream';
import zlib from 'zlib';
import { promisify } from 'util';
import mongoose from 'mongoose';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

export class FileService {
    async uploadFile(
        file: Express.Multer.File,
        userId: string,
        compress: boolean = false
    ): Promise<IFile> {
        const bucket = DatabaseConfig.getGridFSBucket();

        let fileBuffer = file.buffer;
        let isCompressed = false;
        let finalSize = file.size;

        // Compress file if requested (bonus feature)
        if (compress) {
            fileBuffer = await gzip(fileBuffer);
            isCompressed = true;
            finalSize = fileBuffer.length;
        }

        // Upload to GridFS
        const uploadStream = bucket.openUploadStream(file.originalname, {
            metadata: {
                originalName: file.originalname,
                mimeType: file.mimetype,
                owner: userId,
                isCompressed,
            },
        });

        // Convert buffer to stream and pipe to GridFS
        const readableStream = Readable.from(fileBuffer);
        readableStream.pipe(uploadStream);

        // Wait for upload to complete
        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });

        // Create file document with GridFS reference
        const fileDoc = await File.create({
            filename: file.originalname,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: finalSize,
            gridfsId: uploadStream.id,
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

        const bucket = DatabaseConfig.getGridFSBucket();

        // Delete from GridFS
        try {
            await bucket.delete(file.gridfsId);
        } catch (error) {
            console.error('Error deleting from GridFS:', error);
            // Continue to delete metadata even if GridFS delete fails
        }

        // Delete metadata
        await File.findByIdAndDelete(fileId);
    }

    async getFileStream(fileId: string, userId: string): Promise<{ stream: Readable; file: IFile }> {
        const file = await this.getFileById(fileId, userId);
        const bucket = DatabaseConfig.getGridFSBucket();

        // Get download stream from GridFS
        const downloadStream = bucket.openDownloadStream(file.gridfsId);

        return { stream: downloadStream, file };
    }

    async getFileBuffer(fileId: string, userId: string): Promise<{ buffer: Buffer; file: IFile }> {
        const { stream, file } = await this.getFileStream(fileId, userId);

        // Convert stream to buffer
        const chunks: Buffer[] = [];

        await new Promise((resolve, reject) => {
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', resolve);
            stream.on('error', reject);
        });

        const buffer = Buffer.concat(chunks);

        // Decompress if needed
        if (file.isCompressed) {
            const decompressed = await gunzip(buffer);
            return { buffer: decompressed, file };
        }

        return { buffer, file };
    }
}
