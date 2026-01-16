import { Outlet } from 'react-router-dom';
import { NotificationProvider } from './NotificationContext';

export const RootLayout = () => {
  return (
    <NotificationProvider>
      <Outlet />
    </NotificationProvider>
  );
};

export default RootLayout;
