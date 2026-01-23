import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../c-level/SidebarIcons';
import Tooltip from '../c-level/Tooltip';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const toggleButton = (
    <button
      onClick={onToggle}
      className={`
        p-2 rounded-lg bg-transparent border-none cursor-pointer
        text-text-muted hover:bg-accent/10 hover:text-accent
        transition-all duration-200
        ${isCollapsed ? 'mx-auto' : ''}
      `}
    >
      {isCollapsed ? (
        <ChevronRightIcon className="w-5 h-5" />
      ) : (
        <ChevronLeftIcon className="w-5 h-5" />
      )}
    </button>
  );

  return (
    <div className="p-4 flex items-center justify-between border-b border-border">
      {!isCollapsed && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IP</span>
          </div>
          <span className="text-lg font-bold text-text">Interview</span>
        </div>
      )}
      <Tooltip
        content={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        position={isCollapsed ? 'right' : 'bottom'}
      >
        {toggleButton}
      </Tooltip>
    </div>
  );
};

export default SidebarHeader;
