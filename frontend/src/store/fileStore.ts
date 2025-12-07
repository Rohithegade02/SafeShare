import { create } from 'zustand';
import { fileService } from '@/services/file.service';
import type { File, FileUploadRequest, BulkFileUploadRequest } from '@/types';

interface FileState {
    // State
    files: File[];
    selectedFile: File | null;
    isLoading: boolean;
    isUploading: boolean;
    uploadProgress: number;
    error: string | null;

    // Actions
    fetchFiles: () => Promise<void>;
    uploadFile: (request: FileUploadRequest) => Promise<File>;
    uploadBulkFiles: (request: BulkFileUploadRequest) => Promise<File[]>;
    getFileById: (id: string) => Promise<void>;
    downloadFile: (id: string, filename: string) => Promise<void>;
    deleteFile: (id: string) => Promise<void>;
    setSelectedFile: (file: File | null) => void;
    clearError: () => void;
}

export const useFileStore = create<FileState>((set) => ({
    files: [],
    selectedFile: null,
    isLoading: false,
    isUploading: false,
    uploadProgress: 0,
    error: null,

    // Fetch all user files
    fetchFiles: async () => {
        set({ isLoading: true, error: null });
        try {
            const files = await fileService.getUserFiles();
            set({
                files,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch files',
                isLoading: false,
            });
            throw error;
        }
    },

    // Upload single file
    uploadFile: async (request: FileUploadRequest) => {
        set({ isUploading: true, uploadProgress: 0, error: null });
        try {
            const file = await fileService.uploadFile(request);
            set((state) => ({
                files: [file, ...state.files],
                isUploading: false,
                uploadProgress: 100,
                error: null,
            }));
            return file;
        } catch (error: any) {
            set({
                error: error.message || 'File upload failed',
                isUploading: false,
                uploadProgress: 0,
            });
            throw error;
        }
    },

    // Upload multiple files
    uploadBulkFiles: async (request: BulkFileUploadRequest) => {
        set({ isUploading: true, uploadProgress: 0, error: null });
        try {
            const uploadedFiles = await fileService.uploadBulkFiles(request);
            set((state) => ({
                files: [...uploadedFiles, ...state.files],
                isUploading: false,
                uploadProgress: 100,
                error: null,
            }));
            return uploadedFiles;
        } catch (error: any) {
            set({
                error: error.message || 'Bulk upload failed',
                isUploading: false,
                uploadProgress: 0,
            });
            throw error;
        }
    },

    // Get file by ID
    getFileById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const file = await fileService.getFileById(id);
            set({
                selectedFile: file,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to fetch file',
                isLoading: false,
            });
            throw error;
        }
    },

    // Download file
    downloadFile: async (id: string, filename: string) => {
        set({ error: null });
        try {
            await fileService.downloadFile(id, filename);
        } catch (error: any) {
            set({
                error: error.message || 'Failed to download file',
            });
            throw error;
        }
    },

    // Delete file
    deleteFile: async (id: string) => {
        set({ error: null });
        try {
            await fileService.deleteFile(id);
            set((state) => ({
                files: state.files.filter((file) => file.id !== id),
                selectedFile: state.selectedFile?.id === id ? null : state.selectedFile,
                error: null,
            }));
        } catch (error: any) {
            set({
                error: error.message || 'Failed to delete file',
            });
            throw error;
        }
    },

    // Set selected file
    setSelectedFile: (file: File | null) => {
        set({ selectedFile: file });
    },

    // Clear error
    clearError: () => {
        set({ error: null });
    },
}));
