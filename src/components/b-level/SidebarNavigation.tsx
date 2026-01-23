import React from 'react';
import SidebarMenuItem from '../c-level/SidebarMenuItem';
import SidebarDivider from '../c-level/SidebarDivider';
import { mainNavItems,secondaryNavItems } from '../../utils/constants';


export interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

interface SidebarNavigationProps {
  activeItem: string;
  isCollapsed: boolean;
  onItemClick: (id: string) => void;
}


const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeItem,
  isCollapsed,
  onItemClick,
}) => {
  return (
    <nav className="flex-1 px-3 py-4 overflow-y-auto">
      <div className="space-y-1">
        {mainNavItems.map(item => (
          <SidebarMenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            isActive={activeItem === item.id}
            isCollapsed={isCollapsed}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </div>

      <SidebarDivider
        label={!isCollapsed ? 'Support' : undefined}
        isCollapsed={isCollapsed}
      />

      <div className="space-y-1">
        {secondaryNavItems.map(item => (
          <SidebarMenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            isCollapsed={isCollapsed}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </div>
    </nav>
  );
};

export default SidebarNavigation;
