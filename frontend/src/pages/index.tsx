import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';


const LoginLazy = lazy(() => import('./Login'));
const RegisterLazy = lazy(() => import('./Register'));
const DashboardLazy = lazy(() => import('./Dashboard'));
const ActivityLazy = lazy(() => import('./Activity'));
const SharedLazy = lazy(() => import('./Shared'));
const ShareLinkAccessLazy = lazy(() => import('./ShareLinkAccess'));

// Wrap lazy components with Suspense for individual loading states
export const Login = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <LoginLazy />
    </Suspense>
);

export const Register = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <RegisterLazy />
    </Suspense>
);

export const Dashboard = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <DashboardLazy />
    </Suspense>
);

export const Activity = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <ActivityLazy />
    </Suspense>
);

export const Shared = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <SharedLazy />
    </Suspense>
);

export const ShareLinkAccess = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <ShareLinkAccessLazy />
    </Suspense>
);
