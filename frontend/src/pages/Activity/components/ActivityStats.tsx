import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/card"
import { Upload, Download, Share2, Trash2 } from "lucide-react"
import type { ActivityStatsProps } from "../types"
import { Skeleton } from "@/components/atoms/skeleton"

export const ActivityStats = ({
    stats,
    loading,
}: ActivityStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Upload className="h-4 w-4 text-blue-500" />
                        Uploads
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-8 w-16" />
                    ) : (
                        <div className="text-2xl font-bold">{stats?.totalUploads || 0}</div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Download className="h-4 w-4 text-green-500" />
                        Downloads
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-8 w-16" />
                    ) : (
                        <div className="text-2xl font-bold">{stats?.totalDownloads || 0}</div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-purple-500" />
                        Shares
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-8 w-16" />
                    ) : (
                        <div className="text-2xl font-bold">{stats?.totalShares || 0}</div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Trash2 className="h-4 w-4 text-red-500" />
                        Deletes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-8 w-16" />
                    ) : (
                        <div className="text-2xl font-bold">{stats?.totalDeletes || 0}</div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}