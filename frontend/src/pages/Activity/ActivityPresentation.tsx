import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { ActivityItem } from '@/components/molecules/ActivityItem';
import { Skeleton } from '@/components/atoms/skeleton';
import { Upload, Download, Share2, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import type { ActivityPresentationProps } from './types';
import { DashboardHeader } from '../Dashboard/components/DashboardHeader';

export const ActivityPresentation = ({
    user,
    myActivity,
    stats,
    loading,
    onLogout,
    onRefresh,
}: ActivityPresentationProps) => {
    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader
                user={user}
                searchQuery=""
                onSearchChange={() => { }}
                onRefresh={onRefresh}
                isLoading={loading}
                onLogout={onLogout}
            />

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Activity Log</h1>
                        <p className="text-muted-foreground mt-1">
                            Track your file uploads, downloads, and shares
                        </p>
                    </div>
                    <Button onClick={onRefresh} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </div>

                {/* Statistics Cards */}
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

                {/* Activity List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-20 w-full" />
                                ))}
                            </div>
                        ) : myActivity.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No activity yet</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your file activities will appear here
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myActivity.map((activity) => (
                                    <ActivityItem key={activity._id} activity={activity} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};
