import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/lib/constants';
import type { ApiResponse, ApiError } from '@/types';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
        }
        return Promise.reject(error);
    }
);

const handleError = (error: any): ApiError => {
    if (error.response) {
        return {
            success: false,
            message: error.response.data?.message || 'An error occurred',
            error: error.response.data?.error,
            statusCode: error.response.status,
        };
    } else if (error.request) {
        return {
            success: false,
            message: 'No response from server',
            error: 'Network error',
        };
    } else {
        return {
            success: false,
            message: error.message || 'An unexpected error occurred',
            error: 'Unknown error',
        };
    }
};

const get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(url, config);
        return response.data;
    } catch (error: any) {
        throw handleError(error);
    }
};

const post = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(url, data, config);
        return response.data;
    } catch (error: any) {
        throw handleError(error);
    }
};

const put = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(url, data, config);
        return response.data;
    } catch (error: any) {
        throw handleError(error);
    }
};

const deleteFun = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.delete(url, config);
        return response.data;
    } catch (error: any) {
        throw handleError(error);
    }
};

const patch = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.patch(url, data, config);
        return response.data;
    } catch (error: any) {
        throw handleError(error);
    }
};

export const api = {
    get,
    post,
    put,
    delete: deleteFun,
    patch,
};

export { axiosInstance };
