import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { ReactNode } from 'react';
import { ROUTES } from '@/route';

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to={ROUTES.dashboard} replace />;
    }

    return <>{children}</>;
};
