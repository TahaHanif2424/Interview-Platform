import { useEffect, useState, type JSX } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationProps {
  id: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose: (id: string) => void;
}

const typeStyles: Record<NotificationType, { bg: string; border: string; icon: string }> = {
  success: {
    bg: 'bg-accent/10',
    border: 'border-accent',
    icon: 'text-accent',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    icon: 'text-red-500',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-500',
    icon: 'text-amber-500',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    icon: 'text-blue-500',
  },
};

const icons: Record<NotificationType, JSX.Element> = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export const Notification = ({
  id,
  message,
  type = 'info',
  duration = 10000,
  onClose,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const styles = typeStyles[type];

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };
  
  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-lg
        ${styles.bg} ${styles.border}
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
    >
      <span className={`flex-shrink-0 ${styles.icon}`}>{icons[type]}</span>

      <p className="flex-1 text-sm text-text font-medium">{message}</p>

      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-md text-text-muted hover:text-text hover:bg-black/5 transition-colors duration-200"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
