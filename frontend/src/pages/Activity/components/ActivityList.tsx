import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";
import { ActivityItem } from "@/components/molecules";
import type { ActivityListProps } from "../types";

export const ActivityList = (
    {
        myActivity,
        loading,
    }: ActivityListProps
) => {
    return (
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
    );
};