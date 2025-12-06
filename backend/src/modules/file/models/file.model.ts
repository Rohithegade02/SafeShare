import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    owner: mongoose.Types.ObjectId;
    isCompressed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FileSchema = new Schema<IFile>(
    {
        filename: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isCompressed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const File = mongoose.model<IFile>('File', FileSchema);
