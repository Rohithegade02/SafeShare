import { memo } from 'react';
import { Header } from '../../components/molecules';
import type { DashboardPresentationProps } from './types';
import { DashboardContent } from './components/DashboardContent';
import { DashboardSideBar } from './components/DashboardSideBar';


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
    onFileShare,
    onFileView,
    onRefresh,
    onLogout,
}: DashboardPresentationProps) => {
    return (
        <div className="min-h-screen  bg-background">
            <Header
                user={user}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onRefresh={onRefresh}
                isLoading={isLoading}
                onLogout={onLogout}
            />
            <main className='flex max-w-[100vw] h-screen flex-1'>
                <DashboardSideBar onFileUpload={onFileUpload} isUploading={isUploading} />
                <div className="border-l flex flex-col  border-gray-200 flex-[0.85]">
                    <p className="text-2xl font-bold p-4">All Files</p>
                    <DashboardContent
                        files={files}
                        isLoading={isLoading}
                        isUploading={isUploading}
                        onFileUpload={onFileUpload}
                        onFileDownload={onFileDownload}
                        onFileDelete={onFileDelete}
                        onFileShare={onFileShare}
                        onFileView={onFileView}
                    />
                </div>
            </main>
        </div>
    );
});

DashboardPresentation.displayName = 'DashboardPresentation';
