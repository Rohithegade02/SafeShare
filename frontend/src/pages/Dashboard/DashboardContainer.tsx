import { useState, useCallback, useMemo, memo } from 'react';
import { useFiles } from '@/hooks/useFiles';
import { useAuth } from '@/hooks/useAuth';
import { useFileView } from '@/hooks/useFileView';
import { DashboardPresentation } from './DashboardPresentation';
import { ShareModal } from '@/components/molecules/ShareModal';
import React from 'react';

/**
 * Dashboard Container - Handles business logic and state
 */
export const DashboardContainer = memo(() => {
    const { user, logout } = useAuth();

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
    const { viewFile } = useFileView();

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedFileForShare, setSelectedFileForShare] = useState<{ id: string; name: string } | null>(null);

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

    // Handle file share
    const handleFileShare = useCallback(
        (fileId: string) => {
            const file = files.find((f) => f._id === fileId);
            if (file) {
                setSelectedFileForShare({ id: file._id, name: file.originalName });
                setIsShareModalOpen(true);
            }
        },
        [files]
    );

    // Handle file view - uses authenticated file viewing
    const handleFileView = useCallback(
        async (fileId: string) => {
            await viewFile(fileId);
        },
        [viewFile]
    );

    // Handle refresh
    const handleRefresh = useCallback(async () => {
        try {
            await fetchFiles();
        } catch (error) {
            console.error('Refresh failed:', error);
        }
    }, [fetchFiles]);

    // Handle share modal close
    const handleShareModalClose = useCallback(() => {
        setIsShareModalOpen(false);
        setSelectedFileForShare(null);
    }, []);

    return (
        <React.Fragment>
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
                onFileShare={handleFileShare}
                onFileView={handleFileView}
                onRefresh={handleRefresh}
                onLogout={logout}
            />

            {selectedFileForShare && (
                <ShareModal
                    fileId={selectedFileForShare.id}
                    fileName={selectedFileForShare.name}
                    isOpen={isShareModalOpen}
                    onClose={handleShareModalClose}
                />
            )}
        </React.Fragment>
    );
});


DashboardContainer.displayName = "DashboardContainer"