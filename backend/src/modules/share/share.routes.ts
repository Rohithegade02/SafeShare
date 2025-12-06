import { Router } from 'express';
import { ShareController } from './controllers/share.controller';
import { authMiddleware } from '../auth/middleware/auth.middleware';

const router = Router();
const shareController = new ShareController();

// All share routes require authentication
router.use(authMiddleware);

// Share management routes
router.post('/users', shareController.shareWithUsers);
router.post('/link', shareController.generateShareLink);
router.get('/shared-with-me', shareController.getSharedFiles);
router.get('/file/:fileId', shareController.getFileShares);
router.get('/access/:shareLink', shareController.accessByLink);
router.post('/revoke', shareController.revokeAccess);
router.delete('/file/:fileId', shareController.deleteShare);

export default router;
