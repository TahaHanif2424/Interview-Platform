import { createBrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import AuthPage from '../pages/AuthPage';
import Dashboard from '../pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth" replace />,
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
