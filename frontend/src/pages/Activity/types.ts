import type { Activity, ActivityStats } from '@/types/audit.types';
import type { User } from '@/types';

export interface ActivityContainerProps { }

export interface ActivityPresentationProps {
    user: User | null;
    myActivity: Activity[];
    stats: ActivityStats | null;
    loading: boolean;
    onLogout: () => void;
    onRefresh: () => Promise<void>;
}


export interface ActivityStatsProps {
    stats: ActivityStats | null;
    loading: boolean;
}

export interface ActivityListProps {
    myActivity: Activity[];
    loading: boolean;
}
