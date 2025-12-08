import { type NextFunction, type Response } from 'express';
import { AuthRequest } from '../../../common/interfaces/request.interface';
import { AuthProvider } from '../providers/auth.provider';
import { AppError } from '../../../common/middleware/error.middleware';

export const authMiddleware = async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        const token = authHeader.substring(7);
        const authService = AuthProvider.getAuthService();

        const decoded = authService.verifyToken(token);
        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};
