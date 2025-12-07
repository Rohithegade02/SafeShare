import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import type { UseUploadButtonProps } from "./types";

export const useUploadButton = ({
    onUpload,
    maxSize = 50 * 1024 * 1024,
}: UseUploadButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [compress, setCompress] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        // Validate file sizes
        const oversizedFiles = files.filter(file => file.size > maxSize);
        if (oversizedFiles.length > 0) {
            toast.error(`Some files exceed the ${maxSize / 1024 / 1024}MB limit`);
            return;
        }

        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);
        setProgress(0);

        try {
            // Simulate progress
            const interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            await onUpload(selectedFiles, compress);

            clearInterval(interval);
            setProgress(100);

            toast.success(`${selectedFiles.length} file(s) uploaded successfully`);
            setIsOpen(false);
            setSelectedFiles([]);
            setCompress(false);
        } catch (error) {
            toast.error('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const removeFile = useCallback((index: number) => {
        setSelectedFiles(files => files.filter((_, i) => i !== index));
    }, []);

    return {
        isOpen,
        setIsOpen,
        selectedFiles,
        setSelectedFiles,
        compress,
        setCompress,
        uploading,
        progress,
        fileInputRef,
        handleFileSelect,
        handleUpload,
        removeFile,
    };
}