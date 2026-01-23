import React from 'react';

interface CalendarDayProps {
  day: number | null;
  isToday?: boolean;
  isSelected?: boolean;
  hasInterview?: boolean;
  interviewCount?: number;
  isCurrentMonth?: boolean;
  onClick?: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isToday = false,
  isSelected = false,
  hasInterview = false,
  interviewCount = 0,
  isCurrentMonth = true,
  onClick,
}) => {
  if (day === null) {
    return <div className="h-9 md:h-10" />;
  }

  const baseStyles =
    'relative h-9 md:h-10 flex flex-col items-center justify-center rounded-lg transition-all duration-200';

  const getStateStyles = () => {
    if (isSelected) {
      return 'bg-accent text-white font-semibold';
    }
    if (isToday) {
      return 'bg-accent/10 text-accent font-semibold border-2 border-accent';
    }
    if (!isCurrentMonth) {
      return 'text-text-light';
    }
    return 'text-text hover:bg-gray-100';
  };

  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${getStateStyles()} ${clickableStyles}`}
      onClick={onClick}
    >
      <span className="text-xs md:text-sm">{day}</span>
      {hasInterview && (
        <div className="absolute bottom-1 flex items-center gap-0.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isSelected ? 'bg-white' : 'bg-accent'
            }`}
          />
          {interviewCount > 1 && (
            <span
              className={`text-xs ${
                isSelected ? 'text-white/80' : 'text-accent'
              }`}
            >
              {interviewCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
