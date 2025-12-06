import { Router } from 'express';
import { FileController } from './controllers/file.controller';
import { authMiddleware } from '../auth/middleware/auth.middleware';
import { upload } from './config/multer.config';

const router = Router();
const fileController = new FileController();

// All file routes require authentication
router.use(authMiddleware);

// Upload routes
router.post('/upload', upload.single('file'), fileController.uploadSingle);
router.post('/upload/bulk', upload.array('files', 10), fileController.uploadMultiple);

// File management routes
router.get('/', fileController.getUserFiles);
router.get('/:id', fileController.getFile);
router.get('/:id/download', fileController.downloadFile);
router.delete('/:id', fileController.deleteFile);

export default router;
