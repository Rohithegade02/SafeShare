import type { File } from '@/types';

export interface ShareLinkAccessContainerProps { }

export interface ShareLinkAccessPresentationProps {
    loading: boolean;
    error: string | null;
    fileData: File | null;
    onDownload: () => void;
    onGoToDashboard: () => void;
}
