import React from 'react';
import { Card, Badge } from '../c-level';
import type { Job } from '../a-level/Jobs/types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const statusColors: Record<Job['status'], 'success' | 'error' | 'info'> = {
  open: 'success',
  closed: 'error',
  filled: 'info',
};

const typeLabels: Record<Job['type'], string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  contract: 'Contract',
  remote: 'Remote',
};

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onClick(job)}
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text">{job.title}</h3>
            <p className="text-sm text-text-muted">{job.department}</p>
          </div>
          <Badge variant={statusColors[job.status]}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Badge>
        </div>

        {/* Description preview */}
        <p className="text-sm text-text-muted line-clamp-2">{job.description}</p>

        {/* Details */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-text-muted bg-background px-2 py-1 rounded-full">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-text-muted bg-background px-2 py-1 rounded-full">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {typeLabels[job.type]}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-sm text-text-muted">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{job.applicants} applicants</span>
          </div>
          <span className="text-xs text-text-light">
            Posted {formatDate(job.createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
};
