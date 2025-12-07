import { api } from './api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { File, FileUploadRequest, BulkFileUploadRequest } from '@/types';

/**
 * Upload a single file
 */
const uploadFile = async (request: FileUploadRequest): Promise<File> => {
    const formData = new FormData();
    formData.append('file', request.file);
    if (request.compress) {
        formData.append('compress', 'true');
    }

    const response = await api.post<File>(API_ENDPOINTS.FILES.UPLOAD, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'File upload failed');
};

/**
 * Upload multiple files
 */
const uploadBulkFiles = async (request: BulkFileUploadRequest): Promise<File[]> => {
    const formData = new FormData();
    request.files.forEach((file) => {
        formData.append('files', file);
    });
    if (request.compress) {
        formData.append('compress', 'true');
    }

    const response = await api.post<File[]>(API_ENDPOINTS.FILES.UPLOAD_BULK, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Bulk file upload failed');
};

/**
 * Get all user files
 */
const getUserFiles = async (): Promise<File[]> => {
    const response = await api.get<File[]>(API_ENDPOINTS.FILES.LIST);

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to fetch files');
};

/**
 * Get a single file by ID
 */
const getFileById = async (id: string): Promise<File> => {
    const response = await api.get<File>(API_ENDPOINTS.FILES.GET(id));

    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || 'Failed to fetch file');
};

/**
 * Download a file
 */
const downloadFile = async (id: string, filename: string): Promise<void> => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINTS.FILES.DOWNLOAD(id)}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('safeshare_auth_token')}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Download failed');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        throw new Error('Failed to download file');
    }
};

/**
 * Delete a file
 */
const deleteFile = async (id: string): Promise<void> => {
    const response = await api.delete(API_ENDPOINTS.FILES.DELETE(id));

    if (!response.success) {
        throw new Error(response.message || 'Failed to delete file');
    }
};

/**
 * File Service
 */
export const fileService = {
    uploadFile,
    uploadBulkFiles,
    getUserFiles,
    getFileById,
    downloadFile,
    deleteFile,
};
