import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    gridfsId: mongoose.Types.ObjectId; // GridFS file ID
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
        gridfsId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
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
