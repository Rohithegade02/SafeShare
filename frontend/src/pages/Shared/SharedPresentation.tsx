import { memo } from 'react';
import { Header } from '@/components/molecules';
import type { SharedPresentationProps } from './types';
import { SharedContent } from './components/SharedContent';

/**
 * Shared Presentation - UI for files shared with me
 */
export const SharedPresentation = memo(({
    user,
    sharedFiles,
    isLoading,
    onFileDownload,
    onFileView,
    onLogout,
}: SharedPresentationProps) => {
    return (
        <div className="min-h-screen bg-background">
            <Header
                user={user}
                searchQuery=""
                onSearchChange={() => { }}
                onRefresh={async () => { }}
                isLoading={isLoading}
                onLogout={onLogout}
            />
            <SharedContent
                sharedFiles={sharedFiles}
                isLoading={isLoading}
                onFileView={onFileView}
                onFileDownload={onFileDownload}
            />
        </div>
    );
});

SharedPresentation.displayName = 'SharedPresentation';
