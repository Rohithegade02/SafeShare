import { FileList, UploadButton } from "@/components/molecules";
import type { DashboardContentProps } from "../types";
import { memo } from "react";

export const DashboardContent = memo(({
    files,
    isLoading,
    isUploading,
    onFileUpload,
    onFileDownload,
    onFileDelete,
    onFileShare,
    onFileView,
}: DashboardContentProps) => {
    return (
        <main className="flex gap-4 flex-wrap  px-4 py-6">
            <FileList
                files={files}
                loading={isLoading}
                onFileClick={onFileView}
                onShare={onFileShare}
                onDownload={onFileDownload}
                onDelete={onFileDelete}
                emptyMessage="Upload your first file to get started"
            />
        </main>
    );
});
DashboardContent.displayName = "DashboardContent";