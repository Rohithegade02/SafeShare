import type { ActivityPresentationProps } from './types';
import { ActivityList } from './components/ActivityList';
import { ActivityStats } from './components/ActivityStats';
import { ActivityHeader } from './components/ActivityHeader';
import { Header } from '@/components/molecules';

export const ActivityPresentation = ({
    user,
    myActivity,
    stats,
    loading,
    onLogout,
    onRefresh,
}: ActivityPresentationProps) => {
    return (
        <div className="min-h-screen bg-background">
            <Header
                user={user}
                searchQuery=""
                onSearchChange={() => { }}
                onRefresh={onRefresh}
                isLoading={loading}
                onLogout={onLogout}
            />
            <main className="container mx-auto px-4 py-8">
                <ActivityHeader />
                <ActivityStats stats={stats} loading={loading} />
                <ActivityList myActivity={myActivity} loading={loading} />
            </main>
        </div>
    );
};
