import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShare } from '@/hooks/useShare';
import { useFiles } from '@/hooks/useFiles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Download, FileIcon, Loader2, AlertCircle } from 'lucide-react';
import { formatFileSize, formatDate } from '@/utils/formatters';

/**
 * ShareLinkAccess - Access a file via share link
 */
export const ShareLinkAccess = () => {
    const { shareLink } = useParams<{ shareLink: string }>();
    const navigate = useNavigate();
    const { accessByLink } = useShare();
    const { downloadFile } = useFiles();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fileData, setFileData] = useState<any>(null);

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
                    setFileData(share.file);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Loading shared file...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error || !fileData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Card className="w-full  max-w-md">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2 text-destructive">
                            <AlertCircle className="h-5 w-5" />
                            Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-center text-muted-foreground mb-4">
                            {error || 'Unable to access this file. The link may be invalid or expired.'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Shared File</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50">
                        <div className="p-3 rounded-lg bg-background">
                            <FileIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{fileData.originalName}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span>{formatFileSize(fileData.size)}</span>
                                <span>•</span>
                                <span>Uploaded {formatDate(fileData.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button onClick={handleDownload} className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download File
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/dashboard')}>
                            Go to Dashboard
                        </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/30 border border-muted">
                        <p className="text-xs text-muted-foreground">
                            🔒 This file has been securely shared with you. Only authenticated users can access shared files.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
