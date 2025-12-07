import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Separator } from '@/components/atoms/separator';
import type { SidebarProps } from './types';
import { Home, FileText, Share2, Activity, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export const Sidebar = ({
    activeRoute,
    fileCount = 0,
    sharedCount = 0,
}: SidebarProps) => {
    const navItems = useMemo(() => [
        {
            title: 'Dashboard',
            icon: Home,
            href: '/dashboard',
            badge: null,
        },
        {
            title: 'My Files',
            icon: FileText,
            href: '/files',
            badge: fileCount > 0 ? fileCount : null,
        },
        {
            title: 'Shared with Me',
            icon: Share2,
            href: '/shared',
            badge: sharedCount > 0 ? sharedCount : null,
        },
        {
            title: 'Activity Log',
            icon: Activity,
            href: '/activity',
            badge: '🎁',
            tooltip: 'Bonus Feature',
        },
    ], [fileCount, sharedCount]);

    const bottomItems = useMemo(() => [
        {
            title: 'Settings',
            icon: Settings,
            href: '/settings',
        },
    ], []);

    return (
        <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full flex-col gap-2 py-4">
                <div className="flex-1 px-3">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeRoute === item.href;

                            return (
                                <Button
                                    key={item.href}
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    className={cn(
                                        'w-full justify-start gap-3',
                                        isActive && 'bg-muted font-medium'
                                    )}
                                    title={item.tooltip}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="flex-1 text-left">{item.title}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="ml-auto">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Button>
                            );
                        })}
                    </nav>
                </div>

                <Separator />

                <div className="px-3">
                    <nav className="space-y-1">
                        {bottomItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeRoute === item.href;

                            return (
                                <Button
                                    key={item.href}
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    className={cn(
                                        'w-full justify-start gap-3',
                                        isActive && 'bg-muted font-medium'
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </Button>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </aside>
    );
};
