import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import { AppError } from '../../../common/middleware/error.middleware';

export class AuthService {
    async register(username: string, email: string, password: string): Promise<{ user: any; token: string }> {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new AppError('User already exists with this email or username', 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = this.generateToken(user);

        return {
            user: this.sanitizeUser(user),
            token,
        };
    }

    async login(email: string, password: string): Promise<{ user: any; token: string }> {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }

        // Generate token
        const token = this.generateToken(user);

        return {
            user: this.sanitizeUser(user),
            token,
        };
    }

    async getUserById(userId: string): Promise<any> {
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return this.sanitizeUser(user);
    }

    async getAllUsers(): Promise<any[]> {
        const users = await User.find().select('-password');
        return users.map(user => this.sanitizeUser(user));
    }

    verifyToken(token: string): any {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            return decoded;
        } catch (error) {
            throw new AppError('Invalid or expired token', 401);
        }
    }

    private generateToken(user: IUser): string {
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
        };

        const secret = process.env.JWT_SECRET || 'secret';
        const options: jwt.SignOptions = {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d' as any,
        };

        return jwt.sign(payload, secret, options);
    }

    private sanitizeUser(user: IUser): any {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}
