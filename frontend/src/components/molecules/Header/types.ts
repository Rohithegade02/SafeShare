import type { User } from "@/types";

export interface HeaderProps {
    user: User | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onRefresh: () => Promise<void>;
    isLoading: boolean;
    onLogout: () => void;
}