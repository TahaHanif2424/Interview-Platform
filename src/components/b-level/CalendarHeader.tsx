import React from 'react';
import { Button } from '../c-level';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  onToday,
}) => {
  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold text-text">{monthYear}</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={onToday}
          className="px-3 py-1.5 text-xs"
        >
          Today
        </Button>
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 transition-colors border-l border-border"
            aria-label="Next month"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChevronLeftIcon = () => (
  <svg
    className="w-4 h-4 text-text"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-4 h-4 text-text"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default CalendarHeader;
