import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { ReactNode } from 'react';
import { ROUTES } from '@/route';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.login} replace />;
    }

    return <>{children}</>;
};
