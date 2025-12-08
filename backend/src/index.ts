import express, { Application, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DatabaseConfig } from './config/database.config';
import { errorHandler } from './common/middleware/error.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { ShareModule } from './modules/share/share.module';
import { AuditModule } from './modules/audit/audit.module';


dotenv.config();

class App {
    public app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3000');

        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(
            cors({
                origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
                credentials: true,
            })
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`${req.method} ${res.statusCode} ${req.path}`);
            next();
        });
    }

    private initializeRoutes(): void {
        // Health check
        this.app.get('/health', (res: Response) => {
            res.status(200).json({
                success: true,
                message: 'SafeShare API is running',
                timestamp: new Date().toISOString(),
            });
        });

        // API routes - Microservice architecture
        this.app.use('/api/auth', AuthModule.getRouter());
        this.app.use('/api/files', FileModule.getRouter());
        this.app.use('/api/share', ShareModule.getRouter());
        this.app.use('/api/audit', AuditModule.getRouter());

        // 404 handler
        this.app.use((res: Response) => {
            res.status(404).json({
                success: false,
                message: 'Route not found',
            });
        });
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public async start(): Promise<void> {
        try {
            await DatabaseConfig.connect();

            this.app.listen(this.port, () => {
                console.log(`Server running on http://localhost:${this.port}`);
            });
        } catch (error) {
            console.error(' Failed to start server:', error);
            process.exit(1);
        }
    }
}

const application = new App();
application.start();

export default application.app;
