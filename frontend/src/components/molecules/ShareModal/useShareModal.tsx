import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useShare } from '@/hooks/useShare';
import { type UseShareModalProps } from './types';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types';

export const useShareModal = ({ fileId, onClose }: UseShareModalProps) => {
    const [expiryTime, setExpiryTime] = useState<string>('never');
    const [shareLink, setShareLink] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const { users, fetchAllUsers } = useAuth();
    const { shareWithUsers: shareWithUsersAction, generateShareLink: generateLinkAction } = useShare();

    // Fetch users when modal opens
    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleShareWithUsers = async () => {
        if (!users || users.length === 0) {
            toast.error('Please select at least one user');
            return;
        }

        setLoading(true);
        try {
            const expiresIn = expiryTime && expiryTime !== 'never' ? parseInt(expiryTime) : undefined;
            await shareWithUsersAction({
                fileId,
                userIds: users.map((user: User) => user.id),
                expiresIn,
            });
            setExpiryTime('never');
            // Close modal after successful share
            if (onClose) {
                setTimeout(() => onClose(), 1000);
            }
        } catch (error) {
            // Error already handled in useShare hook
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateLink = async () => {
        setLoading(true);
        try {
            const expiresIn = expiryTime && expiryTime !== 'never' ? parseInt(expiryTime) : undefined;
            const response = await generateLinkAction({
                fileId,
                expiresIn,
            });

            // Construct full URL for the share link
            const fullLink = `${window.location.origin}/shared/link/${response.shareLink}`;
            setShareLink(fullLink);
        } catch (error) {
            // Error already handled in useShare hook
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        toast.success('Link copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        users,
        expiryTime,
        setExpiryTime,
        shareLink,
        copied,
        loading,
        handleShareWithUsers,
        handleGenerateLink,
        copyToClipboard,
    };
};