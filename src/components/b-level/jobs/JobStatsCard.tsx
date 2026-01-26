import React from 'react';
import { Card } from '../../c-level';

interface JobStatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'default' | 'success' | 'warning' | 'danger';
}

const colorClasses = {
  default: 'bg-accent/10 text-accent',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600',
};

export const JobStatsCard: React.FC<JobStatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'default',
}) => {
  return (
    <Card className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-text-muted">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-text">{value}</p>
          {trend && (
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
