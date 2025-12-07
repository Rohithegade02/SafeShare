import { useCallback } from 'react';
import { toast } from 'sonner';
import { axiosInstance } from '@/services/api';

/**
 * Custom hook for viewing files
 */
export const useFileView = () => {
    /**
     * View a file by opening it in a new window
     * Fetches the file with authentication and creates a blob URL
     */
    const viewFile = useCallback(async (fileId: string) => {
        try {
            // Fetch the file with authentication (auth token is added by API interceptor)
            // Use axiosInstance directly for blob responses
            const response = await axiosInstance.get(`/api/files/${fileId}/download`, {
                responseType: 'blob',
            });

            // Create a blob URL
            const blob = new Blob([response.data], {
                type: response.headers['content-type'] || 'application/octet-stream'
            });
            const blobUrl = URL.createObjectURL(blob);

            // Open in new window
            const newWindow = window.open(blobUrl, '_blank', 'noopener,noreferrer');

            // Clean up the blob URL after the window is loaded
            if (newWindow) {
                newWindow.onload = () => {
                    // Revoke the blob URL after a delay to ensure it's loaded
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                };
            } else {
                // If popup was blocked, revoke immediately and show error
                URL.revokeObjectURL(blobUrl);
                toast.error('Please allow popups to view files');
            }
        } catch (error) {
            console.error('Error viewing file:', error);
            const message = error instanceof Error ? error.message : 'Failed to view file';
            toast.error(message);
        }
    }, []);

    return {
        viewFile,
    };
};
