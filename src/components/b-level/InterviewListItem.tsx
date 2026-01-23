import React from 'react';
import { Badge } from '../c-level';
import type { Interview } from '../a-level/InterviewScheduling/types';

interface InterviewListItemProps {
  interview: Interview;
  onClick?: () => void;
}

const InterviewListItem: React.FC<InterviewListItemProps> = ({
  interview,
  onClick,
}) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusVariant = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border border-border bg-white hover:shadow-sm transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
        <span className="text-accent font-semibold text-xs">
          {interview.candidateName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text text-sm truncate">
          {interview.candidateName}
        </h4>
        <p className="text-xs text-text-muted truncate">{interview.position}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-medium text-text">
          {formatTime(interview.scheduledAt)}
        </p>
        <Badge variant={getStatusVariant(interview.status)} size="sm">
          {getStatusLabel(interview.status)}
        </Badge>
      </div>
    </div>
  );
};

export default InterviewListItem;
