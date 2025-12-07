/**
 * File Types
 */
export interface File {
    _id: string;
    id?: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    gridfsId: string;
    owner: string;
    isCompressed: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Shared File - includes file data + share metadata
 */
export interface SharedFile extends File {
    sharedAt: string;
    shareId: string;
}

export interface FileUploadRequest {
    file: globalThis.File;
    compress?: boolean;
}

export interface BulkFileUploadRequest {
    files: globalThis.File[];
    compress?: boolean;
}

export interface FileResponse {
    success: boolean;
    data: File;
}

export interface FilesResponse {
    success: boolean;
    data: File[];
}

export interface FileDownloadResponse {
    blob: Blob;
    filename: string;
}
