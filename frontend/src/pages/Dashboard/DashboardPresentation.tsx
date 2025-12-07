import { memo } from 'react';
import { FileList } from '@/components/molecules/FileList';
import { UploadButton } from '@/components/molecules/UploadButton';
import { DashboardHeader } from './components/DashboardHeader';
import type { DashboardPresentationProps } from './types';


/**
 * Dashboard Presentation - Pure UI component using existing molecules
 */
export const DashboardPresentation = memo(({
    user,
    files,
    isLoading,
    isUploading,
    searchQuery,
    onSearchChange,
    onFileUpload,
    onFileDownload,
    onFileDelete,
    onFileView,
    onRefresh,
    onLogout,
}: DashboardPresentationProps) => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <DashboardHeader
                user={user}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onRefresh={onRefresh}
                isLoading={isLoading}
                onLogout={onLogout}
            />

            {/* Main Content */}
            <main className="container px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <UploadButton
                            onUpload={onFileUpload}
                            multiple={true}
                            disabled={isUploading}
                        />
                    </div>
                </div>
                <FileList
                    files={files}
                    loading={isLoading}
                    onFileClick={onFileView}
                    onDownload={onFileDownload}
                    onDelete={onFileDelete}
                    emptyMessage="Upload your first file to get started"
                />
            </main>
        </div>
    );
});

DashboardPresentation.displayName = 'DashboardPresentation';
