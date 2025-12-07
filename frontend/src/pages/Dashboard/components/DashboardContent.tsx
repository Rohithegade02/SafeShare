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
                onShare={onFileShare}
                onDownload={onFileDownload}
                onDelete={onFileDelete}
                emptyMessage="Upload your first file to get started"
            />
        </main>
    );
});
DashboardContent.displayName = "DashboardContent";