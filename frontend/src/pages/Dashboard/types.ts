import type { File, User } from "@/types";

export interface DashboardHeaderProps {
    user: User | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onRefresh: () => Promise<void>;
    isLoading: boolean;
    onLogout: () => void;
}

export interface DashboardPresentationProps {
    user: User | null;
    files: File[]
    isLoading: boolean;
    isUploading: boolean;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onFileUpload: (files: globalThis.File[], compress: boolean) => Promise<void>;
    onFileDownload: (fileId: string) => void;
    onFileDelete: (fileId: string) => void;
    onFileView: (fileId: string) => void;
    onRefresh: () => Promise<void>;
    onLogout: () => void;
}

export interface DashboardContentProps {
    files: File[];
    isLoading: boolean;
    isUploading: boolean;
    onFileUpload: (files: globalThis.File[], compress: boolean) => Promise<void>;
    onFileDownload: (fileId: string) => void;
    onFileDelete: (fileId: string) => void;
    onFileView: (fileId: string) => void;
}