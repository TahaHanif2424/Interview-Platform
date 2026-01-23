export interface SidebarProps {
  defaultCollapsed?: boolean;
  onNavigate?: (itemId: string) => void;
}

export interface SidebarState {
  isCollapsed: boolean;
  activeItem: string;
}
