import { useState, useCallback, useMemo } from 'react';
import type { Interview, InterviewFormData, InterviewSchedulingState } from './types';

const MOCK_INTERVIEWS: Interview[] = [
  {
    id: '1',
    candidateName: 'John Smith',
    candidateEmail: 'john@example.com',
    position: 'Senior Frontend Developer',
    scheduledAt: new Date(new Date().setHours(10, 0, 0, 0)),
    duration: 60,
    status: 'scheduled',
  },
  {
    id: '2',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah@example.com',
    position: 'Backend Engineer',
    scheduledAt: new Date(new Date().setHours(14, 30, 0, 0)),
    duration: 45,
    status: 'scheduled',
  },
  {
    id: '3',
    candidateName: 'Mike Williams',
    candidateEmail: 'mike@example.com',
    position: 'Full Stack Developer',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 2)),
    duration: 60,
    status: 'scheduled',
  },
  {
    id: '4',
    candidateName: 'Emily Davis',
    candidateEmail: 'emily@example.com',
    position: 'DevOps Engineer',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    duration: 60,
    status: 'completed',
  },
  {
    id: '5',
    candidateName: 'Chris Brown',
    candidateEmail: 'chris@example.com',
    position: 'Product Manager',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    duration: 90,
    status: 'completed',
  },
  {
    id: '6',
    candidateName: 'Alex Turner',
    candidateEmail: 'alex@example.com',
    position: 'UI/UX Designer',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 5)),
    duration: 45,
    status: 'scheduled',
  },
];

export const useInterviewScheduling = () => {
  const [state, setState] = useState<InterviewSchedulingState>({
    interviews: MOCK_INTERVIEWS,
    currentMonth: new Date(),
    selectedDate: null,
    isScheduleModalOpen: false,
    isDayModalOpen: false,
  });

  const pendingInterviews = useMemo(
    () =>
      state.interviews.filter(
        (i) => i.status === 'scheduled' || i.status === 'in-progress'
      ),
    [state.interviews]
  );

  const concludedInterviews = useMemo(
    () =>
      state.interviews.filter(
        (i) => i.status === 'completed' || i.status === 'cancelled'
      ),
    [state.interviews]
  );

  const selectedDateInterviews = useMemo(() => {
    if (!state.selectedDate) return [];
    return state.interviews.filter((interview) => {
      const interviewDate = new Date(interview.scheduledAt);
      return (
        interviewDate.getFullYear() === state.selectedDate!.getFullYear() &&
        interviewDate.getMonth() === state.selectedDate!.getMonth() &&
        interviewDate.getDate() === state.selectedDate!.getDate()
      );
    });
  }, [state.interviews, state.selectedDate]);

  const goToPreviousMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentMonth: new Date(
        prev.currentMonth.getFullYear(),
        prev.currentMonth.getMonth() - 1,
        1
      ),
    }));
  }, []);

  const goToNextMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentMonth: new Date(
        prev.currentMonth.getFullYear(),
        prev.currentMonth.getMonth() + 1,
        1
      ),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentMonth: new Date(),
    }));
  }, []);

  const selectDate = useCallback((date: Date) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
      isDayModalOpen: true,
    }));
  }, []);

  const openScheduleModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isScheduleModalOpen: true,
    }));
  }, []);

  const closeScheduleModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isScheduleModalOpen: false,
    }));
  }, []);

  const closeDayModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDayModalOpen: false,
    }));
  }, []);

  const scheduleInterview = useCallback((formData: InterviewFormData) => {
    const scheduledAt = new Date(`${formData.date}T${formData.time}`);
    const newInterview: Interview = {
      id: Date.now().toString(),
      candidateName: formData.candidateName,
      candidateEmail: formData.candidateEmail,
      position: formData.position,
      scheduledAt,
      duration: formData.duration,
      status: 'scheduled',
      notes: formData.notes,
    };

    setState((prev) => ({
      ...prev,
      interviews: [...prev.interviews, newInterview],
      isScheduleModalOpen: false,
    }));
  }, []);

  const openScheduleFromDayModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDayModalOpen: false,
      isScheduleModalOpen: true,
    }));
  }, []);

  return {
    ...state,
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
  };
};
