import type { File, User } from '@/types';

export interface SharedPresentationProps {
    user: User | null;
    sharedFiles: File[];
    isLoading: boolean;
    onFileDownload: (fileId: string) => void;
    onFileView: (fileId: string) => void;
    onLogout: () => void;
}
