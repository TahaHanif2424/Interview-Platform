import React from 'react';
import { Card, Badge } from '../c-level';

interface InterviewStatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  variant: 'pending' | 'concluded';
  subtitle?: string;
}

const InterviewStatsCard: React.FC<InterviewStatsCardProps> = ({
  title,
  count,
  icon,
  variant,
  subtitle,
}) => {
  const iconBgStyles = {
    pending: 'bg-yellow-100',
    concluded: 'bg-green-100',
  };

  const iconColorStyles = {
    pending: 'text-yellow-600',
    concluded: 'text-green-600',
  };

  return (
    <Card className="flex items-center gap-4">
      <div
        className={`p-3 rounded-xl ${iconBgStyles[variant]} ${iconColorStyles[variant]}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-text-muted">{title}</h3>
          <Badge variant={variant === 'pending' ? 'warning' : 'success'}>
            {variant === 'pending' ? 'Pending' : 'Done'}
          </Badge>
        </div>
        <p className="text-2xl font-bold text-text mt-1">{count}</p>
        {subtitle && (
          <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
    </Card>
  );
};

export default InterviewStatsCard;
