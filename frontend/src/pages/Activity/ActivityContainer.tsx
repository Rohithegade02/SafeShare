import { useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAudit } from '@/hooks/useAudit';
import { ActivityPresentation } from './ActivityPresentation';

/**
 * Activity Container - Handles business logic for activity logs
 */
export const ActivityContainer = () => {
    const { user, logout } = useAuth();
    const {
        myActivity,
        stats,
        myActivityLoading,
        statsLoading,
        fetchMyActivity,
        fetchStats,
    } = useAudit();

    // Fetch activity and stats on mount
    useEffect(() => {
        fetchMyActivity();
        fetchStats();
    }, [fetchMyActivity, fetchStats]);

    // Handle refresh
    const handleRefresh = useCallback(async () => {
        await Promise.all([fetchMyActivity(), fetchStats()]);
    }, [fetchMyActivity, fetchStats]);

    return (
        <ActivityPresentation
            user={user}
            myActivity={myActivity}
            stats={stats}
            loading={myActivityLoading || statsLoading}
            onLogout={logout}
            onRefresh={handleRefresh}
        />
    );
};
