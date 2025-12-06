import { Router } from 'express';
import fileRoutes from './file.routes';

export class FileModule {
    static getRouter(): Router {
        return fileRoutes;
    }
}
