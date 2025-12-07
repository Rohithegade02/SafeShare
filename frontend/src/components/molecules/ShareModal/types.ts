export interface ShareModalProps {
    fileId: string;
    fileName: string;
    isOpen: boolean;
    onClose: () => void;
}

export interface UseShareModalProps {
    fileId: string;
    onClose?: () => void;
}

export interface User {
    id: string;
    username: string;
    email: string;
}
