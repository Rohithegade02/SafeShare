import { memo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShare } from '@/hooks/useShare';
import { useFiles } from '@/hooks/useFiles';
import { ShareLinkAccessPresentation } from './ShareLinkAccessPresentation';
import type { File } from '@/types';

/**
 * ShareLinkAccessContainer - Logic for accessing a file via share link
 */
export const ShareLinkAccessContainer = memo(() => {
    const { shareLink } = useParams<{ shareLink: string }>();
    const navigate = useNavigate();
    const { accessByLink } = useShare();
    const { downloadFile } = useFiles();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fileData, setFileData] = useState<File | null>(null);

    useEffect(() => {
        const loadFile = async () => {
            if (!shareLink) {
                setError('Invalid share link');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const share = await accessByLink(shareLink);

                // Extract file from share
                if (share && typeof share.file === 'object') {
                    setFileData(share.file as File);
                } else {
                    setError('File not found or access denied');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to access file');
            } finally {
                setLoading(false);
            }
        };

        loadFile();
    }, [shareLink, accessByLink]);

    const handleDownload = async () => {
        if (fileData) {
            try {
                await downloadFile(fileData._id, fileData.originalName);
            } catch (error) {
                console.error('Download failed:', error);
            }
        }
    };

    const handleGoToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <ShareLinkAccessPresentation
            loading={loading}
            error={error}
            fileData={fileData}
            onDownload={handleDownload}
            onGoToDashboard={handleGoToDashboard}
        />
    );
});

ShareLinkAccessContainer.displayName = 'ShareLinkAccessContainer';
