export interface FileListProps {
    files: Array<{
        id: string;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        isCompressed: boolean;
        createdAt: string;
    }>;
    loading?: boolean;
    onFileClick?: (fileId: string) => void;
    onShare?: (fileId: string) => void;
    onDownload?: (fileId: string) => void;
    onDelete?: (fileId: string) => void;
    emptyMessage?: string;
}
