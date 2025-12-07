export interface ActivityItemProps {
    activity: {
        id: string;
        action: 'FILE_UPLOAD' | 'FILE_DOWNLOAD' | 'FILE_DELETE' | 'SHARE_CREATE' | 'SHARE_ACCESS' | 'SHARE_REVOKE';
        user: {
            id: string;
            username: string;
            email: string;
        };
        file?: {
            id: string;
            name: string;
        };
        targetUser?: {
            id: string;
            username: string;
        };
        createdAt: string;
    };
}
