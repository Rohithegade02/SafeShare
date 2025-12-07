// hook for share modal

import { useState } from "react";
import { toast } from "sonner";
import type { UseShareModalProps } from "./types";

export const useShareModal = ({
    onShareWithUsers,
    onGenerateLink,
}: UseShareModalProps) => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [expiryTime, setExpiryTime] = useState<string>('');
    const [shareLink, setShareLink] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShareWithUsers = async () => {
        if (selectedUsers.length === 0) {
            toast.error('Please select at least one user');
            return;
        }

        setLoading(true);
        try {
            const expiresIn = expiryTime ? parseInt(expiryTime) : undefined;
            await onShareWithUsers(selectedUsers, expiresIn);
            toast.success(`File shared with ${selectedUsers.length} user(s)`);
            setSelectedUsers([]);
            setExpiryTime('');
        } catch (error) {
            toast.error('Failed to share file');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateLink = async () => {
        setLoading(true);
        try {
            const expiresIn = expiryTime ? parseInt(expiryTime) : undefined;
            const link = await onGenerateLink(expiresIn);
            setShareLink(link);
            toast.success('Share link generated');
        } catch (error) {
            toast.error('Failed to generate link');
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
        selectedUsers,
        setSelectedUsers,
        expiryTime,
        setExpiryTime,
        shareLink,
        copied,
        loading,
        handleShareWithUsers,
        handleGenerateLink,
        copyToClipboard,
    };
}