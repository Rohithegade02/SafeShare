import { FileCard } from '../FileCard';
import { Skeleton } from '@/components/atoms/skeleton';
import type { FileListProps } from './types';
import { FileX } from 'lucide-react';
import { memo } from 'react';

export const FileList = memo(({
    files,
    loading = false,
    onFileClick,
    onShare,
    onDownload,
    onDelete,
    emptyMessage = 'No files found',
}: FileListProps) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                    </div>
                ))}
            </div>
        );
    }

    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileX className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-1">No files yet</h3>
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
                <FileCard
                    key={file._id}
                    file={file}
                    onView={onFileClick}
                    onShare={onShare}
                    onDownload={onDownload}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
});

FileList.displayName = 'FileList';
