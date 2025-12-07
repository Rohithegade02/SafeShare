import { memo } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import type { DashboardPresentationProps } from './types';
import { DashboardContent } from './components/DashboardContent';


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
            <DashboardContent
                files={files}
                isLoading={isLoading}
                isUploading={isUploading}
                onFileUpload={onFileUpload}
                onFileDownload={onFileDownload}
                onFileDelete={onFileDelete}
                onFileView={onFileView}
            />
        </div>
    );
});

DashboardPresentation.displayName = 'DashboardPresentation';
