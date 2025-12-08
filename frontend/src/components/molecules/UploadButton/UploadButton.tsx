import { Activity } from 'react';
import { Button } from '@/components/atoms/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/atoms/dialog';
import { Progress } from '@/components/atoms/progress';
import { Switch } from '@/components/atoms/switch';
import { Label } from '@/components/atoms/label';
import type { UploadButtonProps } from './types';
import { Upload, FileUp, X } from 'lucide-react';
import { formatFileSize } from '@/utils';
import { useUploadButton } from './useUploadButton';
import { memo } from 'react';

export const UploadButton = memo(({
    onUpload,
    multiple = false,
    maxSize = 50 * 1024 * 1024, // 50MB
    accept = '.pdf,.png,.jpg,.jpeg,.gif,.csv,.xlsx,.xls,.doc,.docx',
    disabled = false,
}: UploadButtonProps) => {
    const { isOpen, setIsOpen, selectedFiles, compress, setCompress, uploading, progress, fileInputRef, handleFileSelect, handleUpload, removeFile } = useUploadButton({ onUpload, maxSize, accept, disabled });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="gap-2">
                    <Upload className="h-4 w-4" />
                    New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload {multiple ? 'Files' : 'File'}</DialogTitle>
                    <DialogDescription>
                        Select {multiple ? 'files' : 'a file'} to upload. Max size: {maxSize / 1024 / 1024}MB per file.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <FileUp className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm font-medium mb-1">
                            Click to select {multiple ? 'files' : 'a file'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {accept.split(',').join(', ')}
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple={multiple}
                            accept={accept}
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                    {selectedFiles.length > 0 && (
                        <div className="space-y-2">
                            <Label>Selected Files ({selectedFiles.length})</Label>
                            <div className="max-h-[200px] overflow-y-auto space-y-2">
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-2 rounded-md bg-muted"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => removeFile(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="space-y-0.5">
                            <Label htmlFor="compress">Compress files</Label>
                            <p className="text-xs text-muted-foreground">
                                Reduce file size using gzip compression
                            </p>
                        </div>
                        <Switch
                            id="compress"
                            checked={compress}
                            onCheckedChange={setCompress}
                        />
                    </div>
                    <Activity mode={uploading ? 'visible' : 'hidden'}>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Uploading...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                    </Activity>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={uploading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={selectedFiles.length === 0 || uploading}
                    >
                        {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} file(s)`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

UploadButton.displayName = 'UploadButton';
