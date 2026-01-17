import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NotificationProvider } from './NotificationContext';
import { useAuthStore } from '../../store/authStore';

export const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { initializeAuth, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  // Handle navigation on auth state change
  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = location.pathname === '/auth';

    if (isAuthenticated && isAuthPage) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <NotificationProvider>
      <Outlet />
    </NotificationProvider>
  );
};

export default RootLayout;
