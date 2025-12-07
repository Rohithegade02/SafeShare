export interface FileCardProps {
    file: {
        _id: string;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        isCompressed: boolean;
        createdAt: string;
        sharedAt?: string; // Optional: when the file was shared (for shared files)
    };
    onShare?: (fileId: string) => void;
    onDownload?: (fileId: string) => void;
    onDelete?: (fileId: string) => void;
    onView?: (fileId: string) => void;
}
