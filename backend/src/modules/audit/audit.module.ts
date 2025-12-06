import { Router } from 'express';
import auditRoutes from './audit.routes';

export class AuditModule {
    static getRouter(): Router {
        return auditRoutes;
    }
}
