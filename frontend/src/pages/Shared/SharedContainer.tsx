import { useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useShare } from '@/hooks/useShare';
import { useFiles } from '@/hooks/useFiles';
import { useFileView } from '@/hooks/useFileView';
import { SharedPresentation } from './SharedPresentation';

/**
 * Shared Container - Handles business logic for shared files
 */
export const SharedContainer = () => {
    const { user, logout } = useAuth();
    const { localSharedFiles, sharedFilesLoading, fetchSharedFiles } = useShare();
    const { downloadFile } = useFiles();
    const { viewFile } = useFileView();

    // Fetch shared files on mount
    useEffect(() => {
        fetchSharedFiles();
    }, []);

    // Handle file download
    const handleFileDownload = useCallback(
        async (fileId: string) => {
            try {
                const file = localSharedFiles.find((f) => f._id === fileId);
                if (file) {
                    await downloadFile(file._id, file.originalName);
                }
            } catch (error) {
                console.error('Download failed:', error);
            }
        },
        [downloadFile, localSharedFiles]
    );

    // Handle file view
    const handleFileView = useCallback(
        async (fileId: string) => {
            await viewFile(fileId);
        },
        [viewFile]
    );



    return (
        <SharedPresentation
            user={user}
            sharedFiles={localSharedFiles}
            isLoading={sharedFilesLoading}
            onFileDownload={handleFileDownload}
            onFileView={handleFileView}
            onLogout={logout}
        />
    );
};

SharedContainer.displayName = 'SharedContainer';
