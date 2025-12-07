import { useCallback } from 'react';
import { toast } from 'sonner';
import * as auditService from '@/services/audit.service';
import { useAuditStore } from '@/store/auditStore';

/**
 * Custom hook for audit/activity log operations
 */
export const useAudit = () => {
    const {
        myActivity,
        fileActivity,
        stats,
        myActivityLoading,
        fileActivityLoading,
        statsLoading,
        myActivityError,
        fileActivityError,
        statsError,
        setMyActivity,
        setFileActivity,
        setStats,
        setMyActivityLoading,
        setFileActivityLoading,
        setStatsLoading,
        setMyActivityError,
        setFileActivityError,
        setStatsError,
        clearActivity,
    } = useAuditStore();

    /**
     * Fetch current user's activity log
     */
    const fetchMyActivity = useCallback(async () => {
        setMyActivityLoading(true);
        setMyActivityError(null);
        try {
            const activity = await auditService.getMyActivity();
            setMyActivity(activity);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch activity';
            setMyActivityError(message);
            toast.error(message);
        } finally {
            setMyActivityLoading(false);
        }
    }, [setMyActivity, setMyActivityLoading, setMyActivityError]);

    /**
     * Fetch activity for a specific file
     */
    const fetchFileActivity = useCallback(
        async (fileId: string) => {
            setFileActivityLoading(true);
            setFileActivityError(null);
            try {
                const activity = await auditService.getFileActivity(fileId);
                setFileActivity(activity);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to fetch file activity';
                setFileActivityError(message);
                toast.error(message);
            } finally {
                setFileActivityLoading(false);
            }
        },
        [setFileActivity, setFileActivityLoading, setFileActivityError]
    );

    /**
     * Fetch activity statistics
     */
    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        setStatsError(null);
        try {
            const stats = await auditService.getActivityStats();
            setStats(stats);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch statistics';
            setStatsError(message);
            toast.error(message);
        } finally {
            setStatsLoading(false);
        }
    }, [setStats, setStatsLoading, setStatsError]);

    return {
        myActivity,
        fileActivity,
        stats,
        myActivityLoading,
        fileActivityLoading,
        statsLoading,
        myActivityError,
        fileActivityError,
        statsError,
        fetchMyActivity,
        fetchFileActivity,
        fetchStats,
        clearActivity,
    };
};
