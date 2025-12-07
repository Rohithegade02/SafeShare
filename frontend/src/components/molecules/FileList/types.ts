import type { File } from "@/types";

export interface FileListProps {
    files: File[]
    loading?: boolean;
    onFileClick?: (fileId: string) => void;
    onShare?: (fileId: string) => void;
    onDownload?: (fileId: string) => void;
    onDelete?: (fileId: string) => void;
    emptyMessage?: string;
}
