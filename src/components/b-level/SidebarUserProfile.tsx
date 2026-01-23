import React from 'react';
import { LogoutIcon } from '../c-level/SidebarIcons';
import Tooltip from '../c-level/Tooltip';

interface SidebarUserProfileProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  isCollapsed: boolean;
  onLogout: () => void;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({
  userName,
  userEmail,
  userAvatar,
  isCollapsed,
  onLogout,
}) => {
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const logoutButton = (
    <button
      onClick={onLogout}
      className="p-2 rounded-lg bg-transparent border-none cursor-pointer text-text-muted hover:bg-red-50 hover:text-red-500 transition-all duration-200"
    >
      <LogoutIcon className="w-5 h-5" />
    </button>
  );

  const userAvaterElement = userAvatar ? (
    <img
      src={userAvatar}
      alt={userName}
      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
      <span className="text-white font-semibold text-sm">{initials}</span>
    </div>
  );

  return (
    <div className="p-3 border-t border-border">
      <div
        className={`
          flex items-center gap-3 p-2 rounded-lg
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        {isCollapsed ? (
          <Tooltip
            content={
              <div className="flex flex-col">
                <span className="font-semibold">{userName}</span>
                <span className="text-xs text-text-light">{userEmail}</span>
              </div>
            }
            position="right"
          >
            {userAvaterElement}
          </Tooltip>
        ) : (
          userAvaterElement
        )}

        {!isCollapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text truncate">
                {userName}
              </p>
              <p className="text-xs text-text-muted truncate">{userEmail}</p>
            </div>

            <Tooltip content="Sign out" position="top">
              {logoutButton}
            </Tooltip>
          </>
        )}
      </div>

      {isCollapsed && (
        <Tooltip content="Sign out" position="right">
          <button
            onClick={onLogout}
            className="w-full mt-2 p-2 rounded-lg bg-transparent border-none cursor-pointer text-text-muted hover:bg-red-50 hover:text-red-500 transition-all duration-200 flex items-center justify-center"
          >
            <LogoutIcon className="w-5 h-5" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default SidebarUserProfile;
