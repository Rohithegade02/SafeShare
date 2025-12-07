import { create } from 'zustand';
import type { Activity, ActivityStats } from '@/types/audit.types';

interface AuditState {
    // Activity data
    myActivity: Activity[];
    fileActivity: Activity[];
    stats: ActivityStats | null;

    // Loading states
    myActivityLoading: boolean;
    fileActivityLoading: boolean;
    statsLoading: boolean;

    // Error states
    myActivityError: string | null;
    fileActivityError: string | null;
    statsError: string | null;

    // Actions
    setMyActivity: (activity: Activity[]) => void;
    setFileActivity: (activity: Activity[]) => void;
    setStats: (stats: ActivityStats) => void;

    setMyActivityLoading: (loading: boolean) => void;
    setFileActivityLoading: (loading: boolean) => void;
    setStatsLoading: (loading: boolean) => void;

    setMyActivityError: (error: string | null) => void;
    setFileActivityError: (error: string | null) => void;
    setStatsError: (error: string | null) => void;

    clearActivity: () => void;
}

export const useAuditStore = create<AuditState>((set) => ({
    // Initial state
    myActivity: [],
    fileActivity: [],
    stats: null,

    myActivityLoading: false,
    fileActivityLoading: false,
    statsLoading: false,

    myActivityError: null,
    fileActivityError: null,
    statsError: null,

    // Actions
    setMyActivity: (activity) => set({ myActivity: activity }),
    setFileActivity: (activity) => set({ fileActivity: activity }),
    setStats: (stats) => set({ stats }),

    setMyActivityLoading: (loading) => set({ myActivityLoading: loading }),
    setFileActivityLoading: (loading) => set({ fileActivityLoading: loading }),
    setStatsLoading: (loading) => set({ statsLoading: loading }),

    setMyActivityError: (error) => set({ myActivityError: error }),
    setFileActivityError: (error) => set({ fileActivityError: error }),
    setStatsError: (error) => set({ statsError: error }),

    clearActivity: () => set({
        myActivity: [],
        fileActivity: [],
        stats: null,
        myActivityError: null,
        fileActivityError: null,
        statsError: null,
    }),
}));
