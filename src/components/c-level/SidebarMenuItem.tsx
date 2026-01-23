import React from 'react';
import Tooltip from './Tooltip';

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  label,
  isActive = false,
  isCollapsed = false,
  badge,
  onClick,
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-all duration-200 border-none cursor-pointer
        ${isCollapsed ? 'justify-center' : 'justify-start'}
        ${
          isActive
            ? 'bg-accent text-white'
            : 'bg-transparent text-text-muted hover:bg-accent/10 hover:text-accent'
        }
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && (
        <>
          <span className="text-sm font-medium flex-1 text-left">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span
              className={`
                text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center
                ${isActive ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent'}
              `}
            >
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <Tooltip
        content={
          <div className="flex items-center gap-2">
            <span>{label}</span>
            {badge !== undefined && badge > 0 && (
              <span className="bg-accent text-white text-xs px-1.5 py-0.5 rounded-full">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </div>
        }
        position="right"
      >
        {buttonContent}
      </Tooltip>
    );
  }

  return buttonContent;
};

export default SidebarMenuItem;
