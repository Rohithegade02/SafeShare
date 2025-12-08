import type { Request, Response } from 'express';
import { AuthProvider } from '../providers/auth.provider';
import { asyncHandler } from '../../../common/middleware/error.middleware';
import { AuthRequest } from '../../../common/interfaces/request.interface';

export class AuthController {
    private authService = AuthProvider.getAuthService();

    register = asyncHandler(async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        const result = await this.authService.register(username, email, password);

        res.status(201).json({
            success: true,
            data: result,
        });
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = await this.authService.login(email, password);

        res.status(200).json({
            success: true,
            data: result,
        });
    });

    getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
        const user = await this.authService.getUserById(req.user!.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    });

    getAllUsers = asyncHandler(async (_req: AuthRequest, res: Response) => {
        const users = await this.authService.getAllUsers();

        return res.status(200).json({
            success: true,
            data: users,
        });
    });
}
