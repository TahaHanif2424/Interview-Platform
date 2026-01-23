import React from 'react';
import { Modal, Button } from '../../c-level';
import InterviewListItem from '../InterviewListItem';
import type { Interview } from '../../a-level/InterviewScheduling/types';

interface DayInterviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  interviews: Interview[];
  onScheduleNew: () => void;
}

const DayInterviewsModal: React.FC<DayInterviewsModalProps> = ({
  isOpen,
  onClose,
  date,
  interviews,
  onScheduleNew,
}) => {
  if (!date) return null;

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const pendingInterviews = interviews.filter(
    (i) => i.status === 'scheduled' || i.status === 'in-progress'
  );
  const completedInterviews = interviews.filter(
    (i) => i.status === 'completed' || i.status === 'cancelled'
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Interviews - ${formattedDate}`}
      size="md"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-text">{interviews.length}</p>
              <p className="text-xs text-text-muted">Total</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {pendingInterviews.length}
              </p>
              <p className="text-xs text-text-muted">Pending</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {completedInterviews.length}
              </p>
              <p className="text-xs text-text-muted">Done</p>
            </div>
          </div>
          <Button onClick={onScheduleNew} className="px-3 py-1.5 text-xs">
            <span className="flex items-center gap-1">
              <PlusIcon />
              Add
            </span>
          </Button>
        </div>

        {interviews.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <CalendarEmptyIcon />
            </div>
            <p className="text-text-muted text-sm">No interviews scheduled</p>
            <Button onClick={onScheduleNew} className="mt-3 text-xs px-3 py-2">
              Schedule Interview
            </Button>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
            {interviews
              .sort(
                (a, b) =>
                  new Date(a.scheduledAt).getTime() -
                  new Date(b.scheduledAt).getTime()
              )
              .map((interview) => (
                <InterviewListItem key={interview.id} interview={interview} />
              ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

const PlusIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const CalendarEmptyIcon = () => (
  <svg
    className="w-8 h-8 text-text-muted"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default DayInterviewsModal;
