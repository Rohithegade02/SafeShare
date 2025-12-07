import { memo } from 'react';
import { FileList } from '@/components/molecules/FileList';
import { DashboardHeader } from '../Dashboard/components/DashboardHeader';
import type { SharedPresentationProps } from './types';
import { Users } from 'lucide-react';

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
            {/* Header */}
            <DashboardHeader
                user={user}
                searchQuery=""
                onSearchChange={() => { }}
                onRefresh={async () => { }}
                isLoading={isLoading}
                onLogout={onLogout}
            />

            {/* Main Content */}
            <main className="container px-4 py-6">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Shared with Me</h1>
                            <p className="text-sm text-muted-foreground">
                                Files that others have shared with you
                            </p>
                        </div>
                    </div>
                </div>

                <FileList
                    files={sharedFiles}
                    loading={isLoading}
                    onFileClick={onFileView}
                    onDownload={onFileDownload}
                    emptyMessage="No files have been shared with you yet"
                />
            </main>
        </div>
    );
});

SharedPresentation.displayName = 'SharedPresentation';
