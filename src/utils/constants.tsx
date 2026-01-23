import type { NavItem } from '../components/b-level';
import {
  DashboardIcon,
  InterviewIcon,
  CalendarIcon,
  CandidatesIcon,
  JobsIcon,
  ReportsIcon,
  SettingsIcon,
  HelpIcon,
} from '../components/c-level/SidebarIcons';

export const mainNavItems: NavItem[] = [
  { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
  { id: 'interviews', icon: <InterviewIcon />, label: 'Interviews', badge: 3 },
  { id: 'calendar', icon: <CalendarIcon />, label: 'Calendar' },
  {
    id: 'candidates',
    icon: <CandidatesIcon />,
    label: 'Candidates',
    badge: 12,
  },
  { id: 'jobs', icon: <JobsIcon />, label: 'Jobs' },
  { id: 'reports', icon: <ReportsIcon />, label: 'Reports' },
];

export const secondaryNavItems: NavItem[] = [
  { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
  { id: 'help', icon: <HelpIcon />, label: 'Help & Support' },
];
