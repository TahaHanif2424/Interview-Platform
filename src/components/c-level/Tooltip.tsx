import React, { useState, useRef, useEffect, useCallback } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'right',
  delay = 200,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const offset = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + offset;
        break;
    }

    // Ensure tooltip stays within viewport
    const padding = 8;
    top = Math.max(
      padding,
      Math.min(top, window.innerHeight - tooltipRect.height - padding)
    );
    left = Math.max(
      padding,
      Math.min(left, window.innerWidth - tooltipRect.width - padding)
    );

    setCoords({ top, left });
  }, [position]);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, calculatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowStyles = (): string => {
    const base = 'absolute w-2 h-2 bg-primary rotate-45';
    switch (position) {
      case 'top':
        return `${base} -bottom-1 left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${base} -top-1 left-1/2 -translate-x-1/2`;
      case 'left':
        return `${base} -right-1 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${base} -left-1 top-1/2 -translate-y-1/2`;
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className="fixed z-50 px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-lg animate-fade-in"
          style={{
            top: coords.top,
            left: coords.left,
          }}
        >
          <div className={getArrowStyles()} />
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
