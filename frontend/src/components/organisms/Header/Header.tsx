import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/atoms/button';
import { LogOut, FileText, Share2, Activity } from 'lucide-react';
import { ROUTES } from '@/route';
import type { User } from '@/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', path: ROUTES.dashboard, icon: FileText },
        { label: 'Shared', path: ROUTES.shared, icon: Share2 },
        { label: 'Activity', path: ROUTES.activity, icon: Activity },
    ];

    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to={ROUTES.dashboard} className="text-2xl font-bold">
                            SafeShare
                        </Link>

                        <nav className="hidden md:flex gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                                            isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-muted'
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="text-sm">
                                <p className="font-medium">{user.username}</p>
                                <p className="text-muted-foreground text-xs">{user.email}</p>
                            </div>
                        )}
                        <Button onClick={onLogout} variant="outline" size="sm">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
