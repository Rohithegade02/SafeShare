import { useCallback } from 'react';
import { toast } from 'sonner';
import { axiosInstance } from '@/services/api';

/**
 * Custom hook for viewing files
 */
export const useFileView = () => {
    const viewFile = useCallback(async (fileId: string) => {
        try {
            const response = await axiosInstance.get(`/api/files/${fileId}/download`, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], {
                type: response.headers['content-type'] || 'application/octet-stream'
            });
            const blobUrl = URL.createObjectURL(blob);

            const newWindow = window.open(blobUrl, '_blank', 'noopener,noreferrer');

            if (newWindow) {
                newWindow.onload = () => {
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                };
            } else {
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
