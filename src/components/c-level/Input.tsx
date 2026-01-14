import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightElement,
  className = '',
  ...props
}) => {
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightElement = Boolean(rightElement);

  const inputStyles = `w-full py-2.5 text-sm border border-border rounded-lg outline-none transition-all duration-200 bg-white text-text placeholder:text-text-light focus:border-accent focus:shadow-[0_0_0_2px_rgba(16,185,129,0.1)] ${
    hasLeftIcon ? 'pl-9' : 'pl-3'
  } ${hasRightElement ? 'pr-10' : 'pr-3'} ${className}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-secondary ml-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 w-4 h-4 text-text-light pointer-events-none flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        <input className={inputStyles} {...props} />
        {rightElement && (
          <span className="absolute right-2.5">{rightElement}</span>
        )}
      </div>
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
};

export default Input;
