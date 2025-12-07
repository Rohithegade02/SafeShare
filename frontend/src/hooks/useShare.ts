import { useCallback, useState } from 'react';
import * as shareService from '@/services/share.service';
import { useShareStore } from '@/store/shareStore';
import { toast } from 'sonner';
import type {
    ShareWithUsersRequest,
    GenerateShareLinkRequest,
    RevokeAccessRequest,
} from '@/types/share.types';
import type { SharedFile } from '@/types/file.types';

/**
 * Custom hook for file sharing operations
 */
export const useShare = () => {
    const [localSharedFiles, setLocalSharedFiles] = useState<SharedFile[]>([]);

    const store = useShareStore();

    const {
        sharedFilesLoading,
        sharedFilesError,
        currentFileShares,
        currentSharesLoading,
        setSharedWithMeFiles,
        setSharedFilesLoading,
        setSharedFilesError,
        setCurrentFileShares,
        setCurrentSharesLoading,
    } = store;


    /**
     * Share a file with specific users
     */
    const shareWithUsers = useCallback(
        async (data: ShareWithUsersRequest) => {
            try {
                const response = await shareService.shareWithUsers(data);
                toast.success(`File shared with ${data.userIds.length} user(s)`);
                return response;
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to share file';
                toast.error(message);
                throw error;
            }
        },
        []
    );

    /**
     * Generate a shareable link
     */
    const generateShareLink = useCallback(
        async (data: GenerateShareLinkRequest) => {
            try {
                const response = await shareService.generateShareLink(data);
                toast.success('Share link generated successfully');
                return response;
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to generate link';
                toast.error(message);
                throw error;
            }
        },
        []
    );

    /**
     * Fetch all files shared with the current user
     */
    const fetchSharedFiles = useCallback(async () => {
        setSharedFilesLoading(true);
        setSharedFilesError(null);
        try {
            const shares = await shareService.getSharedFiles();

            const sharedFiles: SharedFile[] = shares
                .map((share) => {
                    if (typeof share.file === 'object' && share.file !== null) {
                        return {
                            ...share.file,
                            sharedAt: share.createdAt,
                            shareId: share.id,
                        };
                    }
                    return null;
                })
                .filter((file): file is SharedFile => file !== null);

            setSharedWithMeFiles(sharedFiles as any[]);
            setLocalSharedFiles(sharedFiles);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch shared files';
            setSharedFilesError(message);
            toast.error(message);
        } finally {
            setSharedFilesLoading(false);
        }
    }, [setSharedWithMeFiles, setSharedFilesLoading, setSharedFilesError]);

    /**
     * Get shares for a specific file (owner only)
     */
    const getFileShares = useCallback(
        async (fileId: string) => {
            setCurrentSharesLoading(true);
            try {
                const share = await shareService.getFileShares(fileId);
                setCurrentFileShares(share);
                return share;
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to fetch file shares';
                toast.error(message);
                throw error;
            } finally {
                setCurrentSharesLoading(false);
            }
        },
        [setCurrentFileShares, setCurrentSharesLoading]
    );

    /**
     * Access a file using a share link
     */
    const accessByLink = useCallback(async (shareLink: string) => {
        try {
            const response = await shareService.accessByLink(shareLink);
            toast.success('File accessed successfully');
            return response;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to access file';
            toast.error(message);
            throw error;
        }
    }, []);

    /**
     * Revoke access from specific users
     */
    const revokeAccess = useCallback(
        async (data: RevokeAccessRequest) => {
            try {
                await shareService.revokeAccess(data);
                toast.success('Access revoked successfully');
                // Refresh file shares
                if (currentFileShares) {
                    await getFileShares(data.fileId);
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to revoke access';
                toast.error(message);
                throw error;
            }
        },
        [currentFileShares, getFileShares]
    );

    /**
     * Delete all shares for a file
     */
    const deleteAllShares = useCallback(async (fileId: string) => {
        try {
            await shareService.deleteAllShares(fileId);
            toast.success('All shares deleted successfully');
            setCurrentFileShares(null);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete shares';
            toast.error(message);
            throw error;
        }
    }, [setCurrentFileShares]);

    return {
        localSharedFiles,
        sharedFilesLoading,
        sharedFilesError,
        currentFileShares,
        currentSharesLoading,
        shareWithUsers,
        generateShareLink,
        fetchSharedFiles,
        getFileShares,
        accessByLink,
        revokeAccess,
        deleteAllShares,
    };
};
