import { AuthService } from '../services/auth.service';

export class AuthProvider {
    private static instance: AuthService;

    static getAuthService(): AuthService {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }
}
