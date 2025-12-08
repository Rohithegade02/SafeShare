import { FileList } from "@/components/molecules";
import { Users } from "lucide-react";
import type { SharedContentProps } from "../types";
import { memo } from "react";

export const SharedContent = memo(({
    sharedFiles,
    isLoading,
    onFileView,
    onFileDownload,
}: SharedContentProps) => {
    return (
        <main className="container px-4 py-6">
            <div className="mb-6 pl-20">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl  font-bold">Shared with Me</h1>
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
    );
});
SharedContent.displayName = 'SharedContent';