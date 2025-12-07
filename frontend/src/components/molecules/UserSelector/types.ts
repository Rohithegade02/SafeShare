export interface UserSelectorProps {
    selectedUsers: string[];
    onSelectionChange: (userIds: string[]) => void;
}

export interface User {
    id: string;
    username: string;
    email: string;
}
