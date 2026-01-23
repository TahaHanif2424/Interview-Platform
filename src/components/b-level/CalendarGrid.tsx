import React from 'react';
import { CalendarDay } from '../c-level';
import type { Interview } from '../a-level/InterviewScheduling/types';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  interviews: Interview[];
  onDateSelect: (date: Date) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  interviews,
  onDateSelect,
}) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getInterviewsForDate = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return interviews.filter((interview) => {
      const interviewDate = new Date(interview.scheduledAt);
      return (
        interviewDate.getFullYear() === date.getFullYear() &&
        interviewDate.getMonth() === date.getMonth() &&
        interviewDate.getDate() === date.getDate()
      );
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-text-muted"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const interviewsForDay = day ? getInterviewsForDate(day) : [];
          return (
            <CalendarDay
              key={index}
              day={day}
              isToday={day ? isToday(day) : false}
              isSelected={day ? isSelected(day) : false}
              hasInterview={interviewsForDay.length > 0}
              interviewCount={interviewsForDay.length}
              onClick={
                day
                  ? () =>
                      onDateSelect(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day
                        )
                      )
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
