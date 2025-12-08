import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register, Dashboard, Activity, Shared, ShareLinkAccess } from '@/pages';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicRoute } from '@/components/PublicRoute';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useEffect, Suspense } from 'react';
import { ROUTES } from './route';
import { useAuthStore } from '@/store/authStore';

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path={ROUTES.login}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.register}
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.dashboard}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.shared}
            element={
              <ProtectedRoute>
                <Shared />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.shareLink}
            element={
              // <ProtectedRoute>
              <ShareLinkAccess />
              // </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.activity}
            element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.home} element={<Navigate to={ROUTES.dashboard} replace />} />
          {/* <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
