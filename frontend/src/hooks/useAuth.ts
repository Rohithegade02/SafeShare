import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/types';
import { toast } from 'sonner';

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
    const navigate = useNavigate();
    const {
        user,
        isAuthenticated,
        isLoading,
        error,
        login: loginAction,
        register: registerAction,
        logout: logoutAction,
        fetchProfile,
        clearError,
        initializeAuth,
    } = useAuthStore();


    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

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
    };
};
