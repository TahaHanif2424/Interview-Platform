import React from 'react';
import { Modal, Button, Badge } from '../../../c-level';
import type { Job } from '../../../a-level/Jobs/types';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onStatusChange?: (jobId: string, status: 'open' | 'closed' | 'filled') => void;
  onDelete?: (jobId: string) => void;
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

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  job,
  onStatusChange,
  onDelete,
}) => {
  if (!job) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleStatusChange = (status: 'open' | 'closed' | 'filled') => {
    if (onStatusChange) {
      onStatusChange(job.id, status);
    }
  };

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this job?')) {
      onDelete(job.id);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Job Details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">{job.title}</h2>
            <p className="text-text-muted">{job.department}</p>
          </div>
          <Badge variant={statusColors[job.status]}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Badge>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-background rounded-lg">
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide">
              Location
            </p>
            <p className="text-sm font-medium text-text mt-1">{job.location}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide">
              Type
            </p>
            <p className="text-sm font-medium text-text mt-1">
              {typeLabels[job.type]}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide">
              Applicants
            </p>
            <p className="text-sm font-medium text-text mt-1">
              {job.applicants}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide">
              Salary
            </p>
            <p className="text-sm font-medium text-text mt-1">
              {job.salary || 'Not specified'}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">Description</h3>
          <p className="text-sm text-text-muted whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">Requirements</h3>
          <p className="text-sm text-text-muted whitespace-pre-wrap">
            {job.requirements}
          </p>
        </div>

        {/* Specification */}
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">Specification</h3>
          <p className="text-sm text-text-muted whitespace-pre-wrap">
            {job.specification}
          </p>
        </div>

        {/* Posted Date */}
        <div className="text-xs text-text-light">
          Posted on {formatDate(job.createdAt)}
        </div>

        {/* Status Actions */}
        {onStatusChange && (
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-text mb-2">
              Change Status
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusChange('open')}
                disabled={job.status === 'open'}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  job.status === 'open'
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                Mark as Open
              </button>
              <button
                onClick={() => handleStatusChange('closed')}
                disabled={job.status === 'closed'}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  job.status === 'closed'
                    ? 'bg-red-100 text-red-700 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                Mark as Closed
              </button>
              <button
                onClick={() => handleStatusChange('filled')}
                disabled={job.status === 'filled'}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  job.status === 'filled'
                    ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                Mark as Filled
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div>
            {onDelete && (
              <Button
                variant="secondary"
                onClick={handleDelete}
                className="text-red-500 border-red-300 hover:bg-red-50"
              >
                Delete Job
              </Button>
            )}
          </div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};
