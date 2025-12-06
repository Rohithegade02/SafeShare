import crypto from 'crypto';
import mongoose from 'mongoose';
import { Share, IShare } from '../models/share.model';
import { File } from '../../file/models/file.model';
import { AppError } from '../../../common/middleware/error.middleware';

export class ShareService {
    async shareWithUsers(
        fileId: string,
        ownerId: string,
        userIds: string[],
        expiresIn?: number // in hours
    ): Promise<IShare> {
        // Verify file ownership
        const file = await File.findById(fileId);
        if (!file) {
            throw new AppError('File not found', 404);
        }

        if (file.owner.toString() !== ownerId) {
            throw new AppError('Only file owner can share', 403);
        }

        // Check if share already exists
        let share = await Share.findOne({ file: fileId, owner: ownerId });

        const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 60 * 60 * 1000) : undefined;

        if (share) {
            // Update existing share
            const existingIds = share.sharedWith.map(id => id.toString());
            const uniqueIds = [...new Set([...existingIds, ...userIds])];
            share.sharedWith = uniqueIds.map(id => new mongoose.Types.ObjectId(id));
            if (expiresAt) {
                share.expiresAt = expiresAt;
            }
            await share.save();
        } else {
            // Create new share
            const shareLink = this.createShareLink();
            share = await Share.create({
                file: fileId,
                owner: ownerId,
                sharedWith: userIds.map(id => new mongoose.Types.ObjectId(id)),
                shareLink,
                expiresAt,
            });
        }

        return share;
    }

    async generateShareLink(fileId: string, ownerId: string, expiresIn?: number): Promise<IShare> {
        // Verify file ownership
        const file = await File.findById(fileId);
        if (!file) {
            throw new AppError('File not found', 404);
        }

        if (file.owner.toString() !== ownerId) {
            throw new AppError('Only file owner can generate share link', 403);
        }

        // Check if share already exists
        let share = await Share.findOne({ file: fileId, owner: ownerId });

        const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 60 * 60 * 1000) : undefined;

        if (share) {
            // Update expiry if provided
            if (expiresAt) {
                share.expiresAt = expiresAt;
                await share.save();
            }
            return share;
        }

        // Create new share with link
        const shareLink = this.createShareLink();
        share = await Share.create({
            file: fileId,
            owner: ownerId,
            sharedWith: [],
            shareLink,
            expiresAt,
        });

        return share;
    }

    async getSharedFiles(userId: string): Promise<any[]> {
        const shares = await Share.find({
            sharedWith: userId,
        })
            .populate('file')
            .populate('owner', 'username email');

        // Filter out expired shares
        const validShares = shares.filter((share) => {
            if (share.expiresAt && new Date() > share.expiresAt) {
                return false;
            }
            return true;
        });

        return validShares;
    }

    async getFileShares(fileId: string, ownerId: string): Promise<IShare | null> {
        const file = await File.findById(fileId);
        if (!file) {
            throw new AppError('File not found', 404);
        }

        if (file.owner.toString() !== ownerId) {
            throw new AppError('Unauthorized', 403);
        }

        const share = await Share.findOne({ file: fileId })
            .populate('sharedWith', 'username email')
            .populate('file');

        return share;
    }

    async accessFileByLink(shareLink: string, userId: string): Promise<any> {
        const share = await Share.findOne({ shareLink }).populate('file');

        if (!share) {
            throw new AppError('Invalid share link', 404);
        }

        // Check if link is expired
        if (share.expiresAt && new Date() > share.expiresAt) {
            throw new AppError('Share link has expired', 403);
        }

        // Check if user has access (owner or explicitly shared with)
        const hasAccess =
            share.owner.toString() === userId ||
            share.sharedWith.some((id) => id.toString() === userId);

        if (!hasAccess) {
            throw new AppError('You do not have access to this file', 403);
        }

        return share;
    }

    async revokeAccess(fileId: string, ownerId: string, userIds: string[]): Promise<void> {
        const file = await File.findById(fileId);
        if (!file) {
            throw new AppError('File not found', 404);
        }

        if (file.owner.toString() !== ownerId) {
            throw new AppError('Only file owner can revoke access', 403);
        }

        const share = await Share.findOne({ file: fileId, owner: ownerId });
        if (!share) {
            throw new AppError('No share found for this file', 404);
        }

        share.sharedWith = share.sharedWith.filter(
            (id) => !userIds.includes(id.toString())
        );

        await share.save();
    }

    async deleteShare(fileId: string, ownerId: string): Promise<void> {
        const file = await File.findById(fileId);
        if (!file) {
            throw new AppError('File not found', 404);
        }

        if (file.owner.toString() !== ownerId) {
            throw new AppError('Only file owner can delete share', 403);
        }

        await Share.findOneAndDelete({ file: fileId, owner: ownerId });
    }

    private createShareLink(): string {
        return crypto.randomBytes(32).toString('hex');
    }
}
