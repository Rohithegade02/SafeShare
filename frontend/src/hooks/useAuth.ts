import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/types';
import { toast } from 'sonner';

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
    const navigate = useNavigate();

    // Use selectors to prevent unnecessary re-renders
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);
    const loginAction = useAuthStore((state) => state.login);
    const registerAction = useAuthStore((state) => state.register);
    const logoutAction = useAuthStore((state) => state.logout);
    const fetchProfile = useAuthStore((state) => state.fetchProfile);
    const clearError = useAuthStore((state) => state.clearError);
    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const users = useAuthStore((state) => state.users);
    const fetchAllUsersAction = useAuthStore((state) => state.fetchAllUsers);


    //Login handler
    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            await loginAction(credentials);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Login failed';
            toast.error(message);
            throw error;
        }
    }, [loginAction, navigate]);

    // register handler
    const register = useCallback(async (credentials: RegisterCredentials) => {
        try {
            await registerAction(credentials);
            toast.success('Registration successful!');
            navigate('/dashboard');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            toast.error(message);
            throw error;
        }
    }, [registerAction, navigate]);

    // logout handler
    const logout = useCallback(() => {
        logoutAction();
        toast.success('Logged out successfully');
        navigate('/login');
    }, [logoutAction, navigate]);

    // refresh profile
    const refreshProfile = useCallback(async () => {
        try {
            await fetchProfile();
        } catch (error: unknown) {
            toast.error('Failed to refresh profile');
        }
    }, [fetchProfile]);

    // fetch all users
    const fetchAllUsers = useCallback(async () => {
        try {
            await fetchAllUsersAction();
        } catch (error: unknown) {
            toast.error('Failed to fetch users');
        }
    }, [fetchAllUsersAction]);


    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        refreshProfile,
        clearError,
        initializeAuth,
        users,
        fetchAllUsers
    };
};
