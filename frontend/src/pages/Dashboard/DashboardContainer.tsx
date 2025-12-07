import { useState, useCallback, useMemo, memo, useRef } from 'react';
import { useFiles } from '@/hooks/useFiles';
import { useAuth } from '@/hooks/useAuth';
import { DashboardPresentation } from './DashboardPresentation';

/**
 * Dashboard Container - Handles business logic and state
 */
export const DashboardContainer = memo(() => {
    const { user, logout } = useAuth();
    const renderRef = useRef(0)
    console.log("render", renderRef.current++)
    const {
        files,
        isLoading,
        isUploading,
        uploadFile,
        uploadBulkFiles,
        downloadFile,
        deleteFile,
        fetchFiles,
    } = useFiles();

    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter files based on search query
    const filteredFiles = useMemo(() => files.filter((file) =>
        file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
    ), [files, searchQuery]);

    // Handle file upload
    const handleFileUpload = useCallback(
        async (files: globalThis.File[], compress: boolean = false) => {
            try {
                if (files.length === 1) {
                    await uploadFile({ file: files[0], compress });
                } else {
                    await uploadBulkFiles({ files, compress });
                }
            } catch (error) {
                console.error('Upload failed:', error);
            }
        },
        [uploadFile, uploadBulkFiles]
    );

    // Handle file download
    const handleFileDownload = useCallback(
        async (fileId: string) => {
            try {
                const file = files.find((f) => f._id === fileId);
                if (file) {
                    await downloadFile(file._id, file.originalName);
                }
            } catch (error) {
                console.error('Download failed:', error);
            }
        },
        [downloadFile, files]
    );

    // Handle file delete
    const handleFileDelete = useCallback(
        async (fileId: string) => {
            try {
                const file = files.find((f) => f._id === fileId);
                if (file) {
                    await deleteFile(file._id, file.originalName);
                }
            } catch (error) {
                console.error('Delete failed:', error);
            }
        },
        [deleteFile, files]
    );

    // Handle file view (placeholder for future implementation)
    const handleFileView = useCallback((fileId: string) => {
        console.log('View file:', fileId);
        // TODO: Implement file details view
    }, []);

    // Handle refresh
    const handleRefresh = useCallback(async () => {
        try {
            await fetchFiles();
        } catch (error) {
            console.error('Refresh failed:', error);
        }
    }, [fetchFiles]);

    return (
        <DashboardPresentation
            user={user}
            files={filteredFiles}
            isLoading={isLoading}
            isUploading={isUploading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFileUpload={handleFileUpload}
            onFileDownload={handleFileDownload}
            onFileDelete={handleFileDelete}
            onFileView={handleFileView}
            onRefresh={handleRefresh}
            onLogout={logout}
        />
    );
});


DashboardContainer.displayName = "DashboardContainer"