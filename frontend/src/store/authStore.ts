import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';

interface AuthState {
    // states
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
    clearError: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // login actions
    login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.login(credentials);
            set({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Login failed',
                isLoading: false,
                isAuthenticated: false,
            });
            throw error;
        }
    },

    // register actions
    register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.register(credentials);
            set({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Registration failed',
                isLoading: false,
                isAuthenticated: false,
            });
            throw error;
        }
    },

    // logout actions
    logout: () => {
        authService.logout();
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        });
    },

    // fetch profile actions
    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const user = await authService.getProfile();
            set({
                user,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch profile',
                isLoading: false,
            });
            throw error;
        }
    },

    // clear error actions
    clearError: () => {
        set({ error: null });
    },

    // initialize auth actions
    initializeAuth: () => {
        const token = authService.getToken();
        const user = authService.getStoredUser();

        if (token && user) {
            set({
                token,
                user,
                isAuthenticated: true,
            });
        }
    },
}));
