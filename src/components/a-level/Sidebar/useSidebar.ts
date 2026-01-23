import { useState, useCallback } from 'react';
import type { SidebarState } from './types';

interface UseSidebarOptions {
  defaultCollapsed?: boolean;
  defaultActiveItem?: string;
  onNavigate?: (itemId: string) => void;
}

export const useSidebar = (options: UseSidebarOptions = {}) => {
  const {
    defaultCollapsed = false,
    defaultActiveItem = 'dashboard',
    onNavigate,
  } = options;

  const [state, setState] = useState<SidebarState>({
    isCollapsed: defaultCollapsed,
    activeItem: defaultActiveItem,
  });

  const toggleCollapse = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCollapsed: !prev.isCollapsed,
    }));
  }, []);

  const setActiveItem = useCallback(
    (itemId: string) => {
      setState(prev => ({
        ...prev,
        activeItem: itemId,
      }));
      onNavigate?.(itemId);
    },
    [onNavigate]
  );

  const collapse = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCollapsed: true,
    }));
  }, []);

  const expand = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCollapsed: false,
    }));
  }, []);

  return {
    isCollapsed: state.isCollapsed,
    activeItem: state.activeItem,
    toggleCollapse,
    setActiveItem,
    collapse,
    expand,
  };
};
