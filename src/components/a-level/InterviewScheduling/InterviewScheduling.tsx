import React from 'react';
import { Card, Button } from '../../c-level';
import {
  InterviewStatsCard,
  CalendarHeader,
  CalendarGrid,
  ScheduleInterviewModal,
  DayInterviewsModal,
} from '../../b-level';
import { useInterviewScheduling } from './useInterviewScheduling';

const InterviewScheduling: React.FC = () => {
  const {
    interviews,
    currentMonth,
    selectedDate,
    isScheduleModalOpen,
    isDayModalOpen,
    pendingInterviews,
    concludedInterviews,
    selectedDateInterviews,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    openScheduleModal,
    closeScheduleModal,
    closeDayModal,
    scheduleInterview,
    openScheduleFromDayModal,
  } = useInterviewScheduling();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Interview Scheduling</h1>
          <p className="text-text-muted mt-1">
            Manage and schedule your upcoming interviews
          </p>
        </div>
        <Button onClick={openScheduleModal} className="px-4">
          <span className="flex items-center gap-2">
            <PlusIcon />
            Schedule Interview
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InterviewStatsCard
          title="Pending Interviews"
          count={pendingInterviews.length}
          icon={<ClockIcon />}
          variant="pending"
          subtitle="Awaiting completion"
        />
        <InterviewStatsCard
          title="Concluded Interviews"
          count={concludedInterviews.length}
          icon={<CheckIcon />}
          variant="concluded"
          subtitle="Successfully completed"
        />
      </div>

      <Card padding="md">
        <CalendarHeader
          currentMonth={currentMonth}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />
        <CalendarGrid
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          interviews={interviews}
          onDateSelect={selectDate}
        />
      </Card>

      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        onClose={closeScheduleModal}
        onSubmit={scheduleInterview}
        selectedDate={selectedDate}
      />

      <DayInterviewsModal
        isOpen={isDayModalOpen}
        onClose={closeDayModal}
        date={selectedDate}
        interviews={selectedDateInterviews}
        onScheduleNew={openScheduleFromDayModal}
      />
    </div>
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

const ClockIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default InterviewScheduling;
