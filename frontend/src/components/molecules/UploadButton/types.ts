export interface UploadButtonProps {
    onUpload: (files: File[], compress: boolean) => Promise<void>;
    multiple?: boolean;
    maxSize?: number;
    accept?: string;
    disabled?: boolean;
}
export interface UseUploadButtonProps {
    onUpload: (files: File[], compress: boolean) => Promise<void>;
    maxSize?: number;
    accept?: string;
    disabled?: boolean;
}