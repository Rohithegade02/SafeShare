import multer from 'multer';
import { AppError } from '../../../common/middleware/error.middleware';

// Use memory storage instead of disk storage for GridFS
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Allowed file types
    const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Invalid file type. Only PDF, images, CSV, and documents are allowed.', 400));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'), // 50MB default
    },
});
