import React from 'react';

interface SidebarDividerProps {
  label?: string;
  isCollapsed?: boolean;
}

const SidebarDivider: React.FC<SidebarDividerProps> = ({
  label,
  isCollapsed = false,
}) => {
  if (isCollapsed) {
    return <div className="my-2 border-t border-border" />;
  }

  return (
    <div className="my-3 flex items-center gap-2">
      {label && (
        <>
          <span className="text-xs font-semibold text-text-light uppercase tracking-wider">
            {label}
          </span>
          <div className="flex-1 border-t border-border" />
        </>
      )}
      {!label && <div className="w-full border-t border-border" />}
    </div>
  );
};

export default SidebarDivider;
