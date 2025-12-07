export interface ShareModalProps {
    fileId: string;
    fileName: string;
    isOpen: boolean;
    onClose: () => void;
    onShareWithUsers: (userIds: string[], expiresIn?: number) => Promise<void>;
    onGenerateLink: (expiresIn?: number) => Promise<string>;
}

export interface UseShareModalProps {
    onShareWithUsers: (userIds: string[], expiresIn?: number) => Promise<void>;
    onGenerateLink: (expiresIn?: number) => Promise<string>;
}

export interface User {
    id: string;
    username: string;
    email: string;
}
