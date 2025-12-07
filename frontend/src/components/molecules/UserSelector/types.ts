import type { User } from "@/types";

export interface UserSelectorProps {
    users: User[];
    onSelectionChange?: (selectedUserIds: string[]) => void;
}
