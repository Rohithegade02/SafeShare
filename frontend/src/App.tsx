import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register, Dashboard } from '@/pages';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicRoute } from '@/components/PublicRoute';
import { useEffect } from 'react';
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
        <Route path={ROUTES.home} element={<Navigate to={ROUTES.dashboard} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
