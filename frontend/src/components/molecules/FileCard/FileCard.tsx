import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import type { FileCardProps } from './types';
import { FileIcon, Download, Share2, Trash2, MoreVertical, Archive } from 'lucide-react';
import { formatFileSize, formatDate, getFileExtension } from '@/utils/formatters';
import { getFileTypeColor } from '@/utils/activity-helpers';
import { Activity, useMemo } from 'react';
import { memo } from 'react';

export const FileCard = memo(({
    file,
    onShare,
    onDownload,
    onDelete,
    onView,
}: FileCardProps) => {
    const dropdownMenuItem = useMemo(() => {
        return [
            {
                label: "Download",
                onClick: () => onDownload?.(file._id),
                icon: Download,
                mode: onDownload
            },
            {
                label: "Share",
                onClick: () => onShare?.(file._id),
                icon: Share2,
                mode: onShare
            },
            {
                label: "Delete",
                onClick: () => onDelete?.(file._id),
                icon: Trash2,
                mode: onDelete
            },
        ]
    }, [onDownload, onShare, onDelete])
    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-muted">
                            <FileIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3
                                className="font-semibold text-sm truncate cursor-pointer hover:text-primary"
                                onClick={() => onView?.(file._id)}
                                title={file.originalName}
                            >
                                {file.originalName}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {formatDate(file.createdAt)}
                            </p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {dropdownMenuItem.map((item) => (
                                <Activity mode={item.mode ? 'visible' : 'hidden'}>
                                    <DropdownMenuItem onClick={() => item.onClick?.()}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </DropdownMenuItem>
                                </Activity>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                <div className="flex gap-2">
                    <Badge variant="secondary" className={getFileTypeColor(file.mimeType)}>
                        {getFileExtension(file.originalName)}
                    </Badge>
                    {file.isCompressed && (
                        <Badge variant="outline" className="gap-1">
                            <Archive className="h-3 w-3" />
                            Compressed
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                    <Activity mode={onDownload ? 'visible' : 'hidden'}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => onDownload?.(file._id)}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                    </Activity>
                    <Activity mode={onShare ? 'visible' : 'hidden'}>
                        <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => onShare?.(file._id)}
                        >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </Activity>
                </div>
            </CardFooter>
        </Card>
    );
});

FileCard.displayName = 'FileCard';
