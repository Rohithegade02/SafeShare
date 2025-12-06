import mongoose, { Document, Schema } from 'mongoose';

export interface IShare extends Document {
    file: mongoose.Types.ObjectId;
    owner: mongoose.Types.ObjectId;
    sharedWith: mongoose.Types.ObjectId[];
    shareLink: string;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ShareSchema = new Schema<IShare>(
    {
        file: {
            type: Schema.Types.ObjectId,
            ref: 'File',
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sharedWith: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        shareLink: {
            type: String,
            unique: true,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster lookups
ShareSchema.index({ shareLink: 1 });
ShareSchema.index({ file: 1, owner: 1 });

export const Share = mongoose.model<IShare>('Share', ShareSchema);
