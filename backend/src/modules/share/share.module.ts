import { Router } from 'express';
import shareRoutes from './share.routes';

export class ShareModule {
    static getRouter(): Router {
        return shareRoutes;
    }
}
