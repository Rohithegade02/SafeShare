import mongoose, { Document, Schema } from 'mongoose';

export enum AuditAction {
    FILE_UPLOAD = 'FILE_UPLOAD',
    FILE_DOWNLOAD = 'FILE_DOWNLOAD',
    FILE_DELETE = 'FILE_DELETE',
    SHARE_CREATE = 'SHARE_CREATE',
    SHARE_ACCESS = 'SHARE_ACCESS',
    SHARE_REVOKE = 'SHARE_REVOKE',
}

export interface IAuditLog extends Document {
    user: mongoose.Types.ObjectId;
    action: AuditAction;
    file?: mongoose.Types.ObjectId;
    targetUser?: mongoose.Types.ObjectId;
    metadata?: any;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        action: {
            type: String,
            enum: Object.values(AuditAction),
            required: true,
        },
        file: {
            type: Schema.Types.ObjectId,
            ref: 'File',
        },
        targetUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        metadata: {
            type: Schema.Types.Mixed,
        },
        ipAddress: String,
        userAgent: String,
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
AuditLogSchema.index({ user: 1, createdAt: -1 });
AuditLogSchema.index({ file: 1, createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
