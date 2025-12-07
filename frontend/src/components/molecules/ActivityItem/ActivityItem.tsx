import { Card } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Avatar, AvatarFallback } from '@/components/atoms/avatar';
import { Icon } from '@/components/atoms/icon';
import { type ActivityItemProps } from './types';
import { getActionIcon, getActionColor, getActionText } from '@/utils/activity-helpers';
import { formatRelativeTime, getInitials } from '@/utils/formatters';


export const ActivityItem = ({ activity }: ActivityItemProps) => {
    const IconComponent = getActionIcon(activity.action);

    return (
        <Card className="p-4">
            <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarFallback>
                        {getInitials(activity.user.username)}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm">
                                <span className="font-semibold">{activity.user.username}</span>
                                {' '}
                                <span className="text-muted-foreground">
                                    {getActionText(activity.action)}
                                </span>
                                {activity.file && (
                                    <>
                                        {' '}
                                        <span className="font-medium">{activity.file.originalName}</span>
                                    </>
                                )}
                                {activity.metadata?.sharedWith && activity.metadata.sharedWith.length > 0 && (
                                    <>
                                        {' with '}
                                        <span className="font-medium">
                                            {activity.metadata.sharedWith.length === 1
                                                ? '1 user'
                                                : `${activity.metadata.sharedWith.length} users`}
                                        </span>
                                    </>
                                )}

                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {formatRelativeTime(activity.createdAt)}
                            </p>
                        </div>

                        <Badge
                            variant="secondary"
                            className={`gap-1 ${getActionColor(activity.action)}`}
                        >
                            {IconComponent && <Icon icon={IconComponent} className="h-3 w-3" />}
                            <span className="text-xs capitalize">
                                {activity.action.split('_')[0].toLowerCase()}
                            </span>
                        </Badge>
                    </div>
                </div>
            </div>
        </Card>
    );
};
