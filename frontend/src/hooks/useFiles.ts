import { useCallback, useEffect } from 'react';
import { useFileStore } from '@/store/fileStore';
import type { FileUploadRequest, BulkFileUploadRequest } from '@/types';
import { toast } from 'sonner';

/**
 * Custom hook for file management
 */
export const useFiles = () => {
    // Use selectors to prevent unnecessary re-renders
    const files = useFileStore((state) => state.files);
    const selectedFile = useFileStore((state) => state.selectedFile);
    const isLoading = useFileStore((state) => state.isLoading);
    const isUploading = useFileStore((state) => state.isUploading);
    const uploadProgress = useFileStore((state) => state.uploadProgress);
    const error = useFileStore((state) => state.error);
    const fetchFilesAction = useFileStore((state) => state.fetchFiles);
    const uploadFileAction = useFileStore((state) => state.uploadFile);
    const uploadBulkFilesAction = useFileStore((state) => state.uploadBulkFiles);
    const getFileByIdAction = useFileStore((state) => state.getFileById);
    const downloadFileAction = useFileStore((state) => state.downloadFile);
    const deleteFileAction = useFileStore((state) => state.deleteFile);
    const setSelectedFile = useFileStore((state) => state.setSelectedFile);
    const clearError = useFileStore((state) => state.clearError);

    // Fetch all files
    const fetchFiles = useCallback(async () => {
        try {
            await fetchFilesAction();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to fetch files';
            toast.error(message);
        }
    }, [fetchFilesAction]);

    // Fetch files on mount
    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    // Upload single file
    const uploadFile = useCallback(
        async (request: FileUploadRequest) => {
            try {
                const file = await uploadFileAction(request);
                toast.success(`${request.file.name} uploaded successfully!`);
                return file;
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'File upload failed';
                toast.error(message);
                throw error;
            }
        },
        [uploadFileAction]
    );

    // Upload multiple files
    const uploadBulkFiles = useCallback(
        async (request: BulkFileUploadRequest) => {
            try {
                const files = await uploadBulkFilesAction(request);
                toast.success(`${files.length} files uploaded successfully!`);
                return files;
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Bulk upload failed';
                toast.error(message);
                throw error;
            }
        },
        [uploadBulkFilesAction]
    );

    // Get file by ID
    const getFileById = useCallback(
        async (id: string) => {
            try {
                await getFileByIdAction(id);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Failed to fetch file';
                toast.error(message);
                throw error;
            }
        },
        [getFileByIdAction]
    );

    // Download file
    const downloadFile = useCallback(
        async (id: string, filename: string) => {
            try {
                await downloadFileAction(id, filename);
                toast.success(`${filename} downloaded successfully!`);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Download failed';
                toast.error(message);
                throw error;
            }
        },
        [downloadFileAction]
    );

    // Delete file
    const deleteFile = useCallback(
        async (id: string, filename: string) => {
            try {
                await deleteFileAction(id);
                toast.success(`${filename} deleted successfully!`);
                fetchFiles();
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Failed to delete file';
                toast.error(message);
                throw error;
            }
        },
        [deleteFileAction]
    );

    return {
        files,
        selectedFile,
        isLoading,
        isUploading,
        uploadProgress,
        error,
        fetchFiles,
        uploadFile,
        uploadBulkFiles,
        getFileById,
        downloadFile,
        deleteFile,
        setSelectedFile,
        clearError,
    };
};
