import { api } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/lib/constants';
import type {
    LoginCredentials,
    RegisterCredentials,
    AuthResponse,
    User,
} from '@/types';

/**
 * Store auth data in localStorage
 */
const setAuthData = (token: string, user: User): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Store user data in localStorage
 */
const setUser = (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Register a new user
 */
const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse['data']>(
        API_ENDPOINTS.AUTH.REGISTER,
        credentials
    );

    if (response.success && response.data) {
        // Store token and user
        setAuthData(response.data.token, response.data.user);
        return response as AuthResponse;
    }

    throw new Error(response.message || 'Registration failed');
};

/**
 * Login user
 */
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse['data']>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
    );

    if (response.success && response.data) {
        // Store token and user
        setAuthData(response.data.token, response.data.user);
        return response as AuthResponse;
    }

    throw new Error(response.message || 'Login failed');
};

/**
 * Logout user
 */
const logout = (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Get current user profile
 */
const getProfile = async (): Promise<User> => {
    const response = await api.get<User>(API_ENDPOINTS.AUTH.PROFILE);

    if (response.success && response.data) {
        // Update stored user
        setUser(response.data);
        return response.data;
    }

    throw new Error(response.message || 'Failed to fetch profile');
};

/**
 * Get all users (for sharing)
 */
const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>(API_ENDPOINTS.AUTH.USERS);

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to fetch users');
};

/**
 * Check if user is authenticated
 */
const isAuthenticated = (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Get stored token
 */
const getToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Get stored user
 */
const getStoredUser = (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }
    return null;
};

/**
 * Authentication Service
 */
export const authService = {
    register,
    login,
    logout,
    getProfile,
    getAllUsers,
    isAuthenticated,
    getToken,
    getStoredUser,
};
