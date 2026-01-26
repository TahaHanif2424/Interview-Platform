import { useState } from 'react';
import { Sidebar } from '../components/a-level/Sidebar';
import { InterviewScheduling } from '../components/a-level/InterviewScheduling';
import { Jobs } from '../components/a-level/Jobs';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleNavigate = (itemId: string) => {
    setActiveSection(itemId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-text">Welcome back!</h1>
              <p className="text-text-muted mt-1">
                Here's what's happening with your interviews today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Interviews" value="24" change="+12%" />
              <StatCard title="Scheduled" value="8" change="+3%" />
              <StatCard title="Completed" value="16" change="+8%" />
              <StatCard title="Candidates" value="42" change="+5%" />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold text-text mb-4">
                Recent Activity
              </h2>
              <p className="text-text-muted">No recent activity to show.</p>
            </div>
          </div>
        );
      case 'interviews':
        return <InterviewScheduling />;
      case 'calendar':
        return (
          <PagePlaceholder
            title="Calendar"
            description="View and manage your schedule."
          />
        );
      case 'candidates':
        return (
          <PagePlaceholder
            title="Candidates"
            description="Browse and manage candidates."
          />
        );
      case 'jobs':
        return <Jobs />;
      case 'reports':
        return (
          <PagePlaceholder
            title="Reports"
            description="View analytics and reports."
          />
        );
      case 'settings':
        return (
          <PagePlaceholder
            title="Settings"
            description="Configure your account settings."
          />
        );
      case 'help':
        return (
          <PagePlaceholder
            title="Help & Support"
            description="Get help and contact support."
          />
        );
      default:
        return (
          <PagePlaceholder
            title="Page Not Found"
            description="This page does not exist."
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onNavigate={handleNavigate} />
      <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard = ({ title, value, change }: StatCardProps) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
    <p className="text-text-muted text-sm">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <span className="text-2xl font-bold text-text">{value}</span>
      <span className="text-sm font-medium text-accent">{change}</span>
    </div>
  </div>
);

interface PagePlaceholderProps {
  title: string;
  description: string;
}

const PagePlaceholder = ({ title, description }: PagePlaceholderProps) => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="bg-white rounded-2xl shadow-sm border border-border p-10 max-w-md text-center">
      <h1 className="text-2xl font-bold text-text mb-2">{title}</h1>
      <p className="text-text-muted">{description}</p>
    </div>
  </div>
);

export default Dashboard;
