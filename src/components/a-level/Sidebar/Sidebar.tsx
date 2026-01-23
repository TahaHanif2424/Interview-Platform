import React from 'react';
import SidebarHeader from '../../b-level/SidebarHeader';
import SidebarNavigation from '../../b-level/SidebarNavigation';
import SidebarUserProfile from '../../b-level/SidebarUserProfile';
import { useSidebar } from './useSidebar';
import { useAuthStore } from '../../../store/authStore';
import type { SidebarProps } from './types';

const Sidebar: React.FC<SidebarProps> = ({
  defaultCollapsed = false,
  onNavigate,
}) => {
  const { isCollapsed, activeItem, toggleCollapse, setActiveItem } = useSidebar(
    {
      defaultCollapsed,
      onNavigate,
    }
  );

  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/auth';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userName =
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <aside
      className={`
        h-screen bg-white border-r border-border
        flex flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-[72px]' : 'w-64'}
      `}
    >
      <SidebarHeader isCollapsed={isCollapsed} onToggle={toggleCollapse} />

      <SidebarNavigation
        activeItem={activeItem}
        isCollapsed={isCollapsed}
        onItemClick={setActiveItem}
      />

      <SidebarUserProfile
        userName={userName}
        userEmail={userEmail}
        isCollapsed={isCollapsed}
        onLogout={handleLogout}
      />
    </aside>
  );
};

export default Sidebar;
