import { Router } from 'express';
import { AuditController } from './controllers/audit.controller';
import { authMiddleware } from '../auth/middleware/auth.middleware';

const router = Router();
const auditController = new AuditController();

// All audit routes require authentication
router.use(authMiddleware);

router.get('/my-activity', auditController.getUserActivityLog);
router.get('/file/:fileId', auditController.getFileActivityLog);
router.get('/stats', auditController.getActivityStats);

export default router;
